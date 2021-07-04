namespace mkg.mtsh {

	export type MoveResult = {
		vx: number,
		vy: number,
		isMove: boolean
	};


	export class Player extends Phaser.Physics.Arcade.Image {
		private shotTimer!: Phaser.Time.TimerEvent;
		private isDownOld: boolean;
		private posTapOld: {x: number, y: number};
		constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | integer) {
			super(scene, x, y, texture, frame);
			this.isDownOld = false;
			this.posTapOld = {x: 0, y: 0};

			scene.add.existing(this);
			scene.physics.add.existing(this);

			this.setOrigin(0.5);
			let offset = this.width * (0.5 - CONST.PLAYER.HIT_DIAMETER);
			this.setCircle(this.width * CONST.PLAYER.HIT_DIAMETER, offset, offset);
			this.startShot(scene);
		}

		public update(scene: Phaser.Scene) {
			let pointer = scene.input.activePointer;

			var resultKeyboard = this.moveKeyboard(scene.input.keyboard.createCursorKeys());
			var resultPointer = this.movePointer(pointer);

			// 有効な方の操作情報を保存する
			var result: MoveResult = {vx:0, vy: 0, isMove: false};
			if(resultKeyboard.isMove) {
				result = resultKeyboard;
			} else if(resultPointer.isMove) {
				result = resultPointer;
			}

			// 直前のフレームでポインターを押下していたか
			this.isDownOld = pointer.isDown;

			if(!result.isMove) {
				this.setVelocity(0, 0);
				return;
			}

			let angle = Phaser.Math.RadToDeg(Math.atan2(result.vy, result.vx));
			this.updateVelo(angle);
		}

		private moveKeyboard(cursors: Phaser.Types.Input.Keyboard.CursorKeys) : MoveResult{
			let isPress = false;

			// 目標進行方向ベクトル
			let targetVec = {x: 0, y:0};
			if (cursors.left && cursors.left.isDown) {
				isPress = true;
				targetVec.x = -1;
			} else if (cursors.right && cursors.right.isDown) {
				isPress = true;
				targetVec.x = 1;
			}

			if (cursors.up && cursors.up.isDown) {
				isPress = true;
				targetVec.y = -1;
			} else if (cursors.down && cursors.down.isDown) {
				isPress = true;
				targetVec.y = 1;
			}

			return {
				vx: targetVec.x,
				vy: targetVec.y,
				isMove: isPress
			};
		}

		private movePointer(pointer: Phaser.Input.Pointer) : MoveResult {
			let defaultResult = {
				vx: 0,
				vy: 0,
				isMove: false
			};

			if(!pointer.isDown) {
				return defaultResult;
			}

			// タップした瞬間はまだ動かさない
			if(!this.isDownOld) {
				this.posTapOld.x = pointer.x;
				this.posTapOld.y = pointer.y;
				return defaultResult;
			}

			let targetVec = {x: 0, y:0};
			targetVec.x = pointer.x - this.posTapOld.x;
			targetVec.y = pointer.y - this.posTapOld.y;

			this.posTapOld.x = pointer.x;
			this.posTapOld.y = pointer.y;

			// 移動量が小さかったら動かないことにする
			let d = targetVec.x * targetVec.x + targetVec.y * targetVec.y;
			let LIMIT = 0.1;
			if(d < LIMIT) {
				return defaultResult;
			}

			return {
				vx: targetVec.x,
				vy: targetVec.y,
				isMove: true
			};
		}

		private updateVelo(angle: number) {
			var velo = util.polarCoord(0,0, CONST.PLAYER.SPEED, angle);

			this.setVelocity(velo.x, velo.y);

			this.outside();
		}

		/**
		 * 画面外処理
		 */
		private outside() {
			if(this.x < CONST.GAME_AREA_RECT.left) {
				this.x = CONST.GAME_AREA_RECT.left;
			} else if(this.x > CONST.GAME_AREA_RECT.right) {
				this.x = CONST.GAME_AREA_RECT.right;
			}
			if(this.y < CONST.GAME_AREA_RECT.top) {
				this.y = CONST.GAME_AREA_RECT.top;
			} else if(this.y > CONST.GAME_AREA_RECT.bottom) {
				this.y = CONST.GAME_AREA_RECT.bottom;
			}
		}

		private startShot(scene: Phaser.Scene) {
			this.shotTimer = scene.time.addEvent({
				loop: true,
				delay: CONST.PLAYER.BULLET.INTERVAL,
				callback: () => {
					this.shot();
				}
			});
		}

		private stopShot() {
			if(this.shotTimer) {
				this.shotTimer.destroy();
			}
		}

		private shot() {
			CONST.PLAYER.BULLET.SHOT_OFFSET.forEach((pos) => {
				BulletManager.getInstance().use(this.x + pos.x, this.y + pos.y, 0, CONST.PLAYER.BULLET.SPEED, {} ,CONST.RESOURCE_KEY.IMG.BULET000, (b: Bullet) => {
					ObjectManager.getInstance().setCollderPlayerBullet(b);
				});
			});
		}

		public stop() {
			this.setVelocity(0, 0);
			this.stopShot();
		}
	}
}
