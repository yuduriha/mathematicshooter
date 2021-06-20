namespace mkg.mtsh {
	export class ObjectManager {
		private static instance: ObjectManager;

		private _player!: Player;
		private enemy!: Enemy;
		private _playerState: PLAYER_STATE = PLAYER_STATE.INIT;
		private playerDeathTimer?: Phaser.Time.TimerEvent|null;

		public get player() {
			return this._player;
		}
		private constructor() {
		}

		public static getInstance(): ObjectManager {
			if(!ObjectManager.instance) {
				ObjectManager.instance = new ObjectManager();
			}

			return ObjectManager.instance;
		}

		public destroyObjects() {
			if(this.playerDeathTimer) {
				this.playerDeathTimer.destroy();
				this.playerDeathTimer = null;
			}
			// 自機
			this._player.destroy(true);
			// 敵機
			this.enemy.destroy();

			// 弾
			BulletManager.getInstance().destroyBulletAll();
		}

		public createObjects(scene: Phaser.Scene) {
			// 背景作成
			Bg.getInstance().create(scene, CONST.RESOURCE_KEY.IMG.BG);

			// 自機作成
			this._player = new Player(scene, CONST.PLAYER.START.x, CONST.PLAYER.START.y.from, CONST.RESOURCE_KEY.IMG.PLAYER);
			// 敵機作成
			this.createEnemy(scene);
			// 爆発管理初期化
			ParticlesManager.getInstance().init(scene);

			this._playerState = PLAYER_STATE.INIT;

			this.playerDeathTimer = null;
		}

		private update(scene: Phaser.Scene) {
			Bg.getInstance().update();

			BulletManager.getInstance().update();
		}

		/**
		 * 開始フェイズ初期化
		 */
		public startPhaseInit(scene: Phaser.Scene, onComplete: () => void) {
			//this.update(scene);

			// 自機をスタート位置から前に進める
			GameManager.getInstance().gameScene.tweens.add({
				targets: this._player,
				y: CONST.PLAYER.START.y.to,
				duration: CONST.PLAYER.START.duration,
				onComplete: () => {
					onComplete();
				}
			});
		}

		/**
		 * 開始フェイズ処理
		 */
		public startPhase(scene: Phaser.Scene) {
			this.update(scene);
		}

		/**
		 * 操作フェイズ処理初期化
		 */
		public playPhaseInit(scene: Phaser.Scene) {
			this._playerState = PLAYER_STATE.PLAY;

			//this.update(scene);

			this.enemy.startPattern(scene);

			//body.y = CONST.ENEMY.START.y.to;//target.y;
//			this.enemy.body.x = 100;
			// 	//
			// let target = {y: this.enemy.body.y};
			// // 敵機をスタート位置から前に進める
			// GameManager.getInstance().gameScene.tweens.add({
			// 	targets: target,
			// 	y: CONST.ENEMY.START.y.to,
			// 	duration: CONST.ENEMY.START.duration,
			// 	onUpdate: () => {
			// 		console.log(target.y);
			// 		//this.enemy.body.y = 100;//target.y;
			// 		//this.enemy.body.x = 100;
			// 	//	this.enemy.body.y = 100;
			// 	},
			// });
		}

		/**
		 * 操作フェイズ処理
		 */
		public playPhase(scene: Phaser.Scene, callback: () => void) {
			this.update(scene);

			this._player.update(scene);

			//this.enemy.update(scene);

			if(this.isGameEnd()) {
				callback();
			}
			// TODO これ順番変えて大丈夫か？ 一部updateに移動中
			// this._player.update(scene);

			// this.enemyList.forEach((e) => {
			// 	e.update(scene);
			// });

			// BulletManager.getInstance().update();
		}

		/**
		 * 終了フェイズ初期化
		 */
		public endPhaseInit(scene: Phaser.Scene) {
			//this.update(scene);
			var label = scene.add.image(CONST.SCREEN_CENTER.x, CONST.SCREEN_CENTER.y, this.isWin() ? CONST.RESOURCE_KEY.IMG.WIN : CONST.RESOURCE_KEY.IMG.LOSE);
			label.setOrigin(0.5, 0.5);

			this._player.stop();
			this.enemy.stop();
		}

		/**
		 * 終了フェイズ処理
		 */
		public endPhase(scene: Phaser.Scene) {
			this.update(scene);
		}

		private createEnemy(scene: Phaser.Scene) {
			let enemy = new Enemy(scene, CONST.ENEMY.START.x, CONST.ENEMY.START.y, CONST.RESOURCE_KEY.IMG.ENEMY, GameManager.getInstance().enemySetting);

			// 自機との当たり判定
			scene.physics.add.overlap(this._player, enemy.image, (p: Phaser.GameObjects.GameObject) => {
				this.colliderPlayerToEnemy(p);
			}, undefined, scene);

			this.enemy = enemy;
		}

		/***
		 * 弾の当たり判定設定
		 */
		public setCollderBullet(bullet: Bullet) {
			let scene = GameManager.getInstance().gameScene;

			// 自機との当たり判定
			scene.physics.add.overlap(bullet, this.player, (b: Phaser.GameObjects.GameObject, p: Phaser.GameObjects.GameObject) => {
				(<Bullet>b).hit();
				this.hitPlayer(<Player>p);
			}, undefined, scene);
		}

		/**
		 * 自機の弾の当たり判定
		 */
		public setCollderPlayerBullet(bullet: Bullet) {
			let scene = GameManager.getInstance().gameScene;

			scene.physics.add.overlap(bullet, this.enemy.image, (b: Phaser.GameObjects.GameObject, e: Phaser.GameObjects.GameObject) => {
				// まだ生きていたら
				if (!this.enemy.isDeath()) {
					// 爆発演出再生
					ParticlesManager.getInstance().explosion(CONST.PARTICLES_COUNT.EXPLOSION, bullet.x, bullet.y);

					bullet.hit();
					this.enemy.hit();

					// 今回の被弾で死んだら
					if (this.enemy.isDeath()) {
						this._playerState = PLAYER_STATE.WIN;
					}
				}
			}, undefined, scene);
		}

		/**
		 * 自機と敵の当たり判定コールバック
		 * @param p
		 */
		private colliderPlayerToEnemy(p: Phaser.GameObjects.GameObject) {
			this.hitPlayer(<Player>p);
		}

		/**
		 * 自機被弾処理
		 * @param p
		 */
		private hitPlayer(p: Player) {
			// 操作中なら死亡
			if(this._playerState === PLAYER_STATE.PLAY) {
				let scene = GameManager.getInstance().gameScene;

				// 一旦爆発作って、繰り返し
				let create = () => {
					let offset = 80;
					let x = (<Player>p).x + (Math.random() - 0.5) * offset;
					let y = (<Player>p).y + (Math.random() - 0.5) * offset;
					ParticlesManager.getInstance().playerDeath(CONST.PARTICLES_COUNT.PLAYER_DEATH, x, y);
				};

				create();
				this.playerDeathTimer = scene.time.addEvent({
					loop: true,
					delay: CONST.PLAYER.DEATH_EXPLOSION_INTERVAL,
					callback: () => {
						create();
					}
				});

				this._playerState = PLAYER_STATE.DEATH;
			}
		}

		public isGameEnd() {
			return this._playerState === PLAYER_STATE.WIN || this._playerState === PLAYER_STATE.DEATH;
		}

		public isWin() {
			return this._playerState === PLAYER_STATE.WIN;
		}
	}
}
