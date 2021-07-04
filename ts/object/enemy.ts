namespace mkg.mtsh {
	export class Enemy {
		private _image: Phaser.Physics.Arcade.Image;
		private hp: number;
		private container: Phaser.GameObjects.Container;
		private hpGauge: EnemyHpGauge;
		private setting: EnemySetting;
		private moveStep: number; // 行動段階
		private moveTween?: Phaser.Tweens.Tween;
		private shotStep: number; // 弾発射段階
		private shotRepeatCnt: number; // 弾発射段階繰り返し
		private shotDurationTimer?: Phaser.Time.TimerEvent;
		private shotIntervalTimer?: Phaser.Time.TimerEvent;
		public get body() {return <Phaser.Physics.Arcade.Body>this.container.body;}
		public get image() {return this._image;}
		constructor(scene: Phaser.Scene, x: number, y: number, texture: string, setting: EnemySetting) {
			this.setting = setting;
			this.moveStep = 0;
			this.moveTween = undefined;
			this.shotStep = 0;
			this.shotRepeatCnt = 0;
			this.shotDurationTimer = undefined;
			this.shotIntervalTimer = undefined;

			// 画像本体生成
			this._image = new Phaser.Physics.Arcade.Image(scene, 0, 0, texture);
			scene.add.existing(this._image);
			scene.physics.add.existing(this._image);
			this._image.setOrigin(0.5);
			this._image.setCircle(this._image.width * 0.5);

			// 体力ゲージ生成
			this.hp = setting.max_hp;
			this.hpGauge = new EnemyHpGauge(scene, this.hp, this._image.width / 2 + 10);

			this.container = scene.add.container(x, y, [this._image, this.hpGauge.graphics]);
			scene.physics.add.existing(this.container);
		}

		public startPattern(scene: Phaser.Scene) {
			this.dispatchMoveTween(scene);
			this.dispatchShotTimer(scene);
		}

		// 移動パターン解析
		private dispatchMoveTween(scene: Phaser.Scene) {
			if(this.setting.move_pattern.length > this.moveStep) {
				let movePattern = this.setting.move_pattern[this.moveStep];
				this.addMoveTween(scene, movePattern.duration, movePattern.move);
			}
		}
		// 移動tween追加
		private addMoveTween(scene: Phaser.Scene, duration: number, move: EnemySettingMove) {
			let target = {
				x: move.x.from,
				y: move.y.from
			};

			let setVelocity = (x: number, y: number) => {
				this.body.setVelocity(x, y);
			};

			setVelocity(target.x, target.y);
			this.moveTween = scene.tweens.add({
				targets: target,
				x: move.x.to,
				y: move.y.to,
				duration: duration,
				onUpdate: () => {
					setVelocity(target.x, target.y);
				},
				onComplete: () => {
					if(move.end) {
						setVelocity(move.end.x, move.end.y);
					}

					++this.moveStep;

					this.dispatchMoveTween(scene);
				}
			});
		}

		private dispatchShotTimer(scene: Phaser.Scene) {
			// 設定してあるステップ数を超えていたら最後を繰り返す
			let step = this.setting.shot_pattern.length > this.shotStep ? this.shotStep : this.setting.shot_pattern.length - 1;

			let pattern = this.setting.shot_pattern[step];

			this.addShotTimer(scene, pattern.duration, pattern.interval, pattern.parame || {type: 0}, pattern.bullet);
		}

		// 移動tween追加
		private addShotTimer(scene: Phaser.Scene, duration: number, interval: number, shotParame: ShotParame, bulletParame: BulletParame) {
			this.setShotInterval(scene, interval, shotParame, bulletParame);

			this.shotDurationTimer = scene.time.addEvent({delay: duration, callback: () => {
				// 繰り返し設定
				if(shotParame.repeat) {
					++this.shotRepeatCnt;

					if(this.shotRepeatCnt < shotParame.repeat.count) {
						// 一定ステップ戻す
						this.shotStep -= shotParame.repeat.back_step;
					} else {
						this.shotRepeatCnt = 0;
						++this.shotStep;
					}
				} else {
					// 一定時間たったらステップを進める
					++this.shotStep;
				}
				this.dispatchShotTimer(scene);
			}});
		}

		/**
		 * 弾発射設定
		 * 必ず前の発射を止める
		 */
		private setShotInterval(scene: Phaser.Scene, interval: number, parame: ShotParame, bulletParame: BulletParame) {
			// 一旦止めてから
			this.stopShotInterval();

			if(interval > 0) {
				this.shotIntervalTimer = scene.time.addEvent({delay: interval, loop: true, callback: () => {
					this.shot(scene, parame, bulletParame)
				}});
			}
		}

		private stopShotInterval() {
			if(this.shotIntervalTimer) {
				this.shotIntervalTimer.remove();
				this.shotIntervalTimer.destroy();
				this.shotIntervalTimer = undefined;
			}
		}

		private shot(scene: Phaser.Scene, shorParame: ShotParame, bulletParame: BulletParame) {
			// 数字振っていくだけだからtypeの定数化しなくていいや
			switch(shorParame.type) {
				case 0: // 何もしない
					break;
				case 1: // 1発ずつ撃つ
					this.shotPattern1(scene, shorParame, bulletParame);
					break;
			}
		}

		// 一定個数発射
		private shotPattern1(scene: Phaser.Scene, shorParame: ShotParame, bulletParame: BulletParame) {
			if(!this.shotDurationTimer) {
				return;
			}

			let num = shorParame.shot_count || 1;
			let step = shorParame.angle_step || 0;
			let repeatDelta = this.shotRepeatCnt * (shorParame.angle_repeat_delta || 0); // 繰り返し中のずらす角度

			for(let cnt = 0; cnt < num ; ++cnt) {
				let delta = cnt * step + repeatDelta;
				let angle = this.shotDurationTimer.getProgress() * (shorParame.angle_rate || 0) + (shorParame.angle_start || 0) + delta;
				let velo = util.newVector2((bulletParame.velo || 0), angle);
				BulletManager.getInstance().use(this.container.x, this.container.y, velo.x, velo.y, bulletParame, CONST.RESOURCE_KEY.IMG.BULET001, (b: Bullet) => {
					ObjectManager.getInstance().setCollderBullet(b);
				});
			}
		}

		public hit() {
			if(this.hp > 0) {
				--this.hp;
				this.hpGauge.update(this.hp);

				if(this.isDeath()) {
					// TODO 死んだ演出？とりあえず消してみる
					this.image.setVisible(false);
				}
			}
		}

		public isDeath() {
			return this.hp <= 0;
		}

		public destroy() {
			this.stop();
			this._image.destroy(true);
			this.hpGauge.destroy();
			this.container.destroy(true);
		}

		public stop() {
			this.body.setVelocity(0, 0);

			if(this.moveTween) {
				this.moveTween.stop();
				this.moveTween = undefined;
			}

			if(this.shotDurationTimer) {
				this.shotDurationTimer.remove();
				this.shotDurationTimer.destroy();
				this.shotDurationTimer = undefined;
			}

			this.stopShotInterval();
		}
	}
}
