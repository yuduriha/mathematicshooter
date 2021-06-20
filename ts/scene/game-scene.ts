namespace mkg.mtsh {
	export class GameScene extends Phaser.Scene {
		private debugText!: Phaser.GameObjects.Text;
		private majorState: GAME_STATE = GAME_STATE.INIT;
		private minorState: MINOR_STATE = MINOR_STATE.INIT;
		private uiCamera!: Phaser.Cameras.Scene2D.Camera;
		private nextKeyCallback?: () => void;
		constructor() {
			super(CONST.SCENE_KEY.GAME);
		}
		preload() {
		}
		create() {
			ObjectManager.getInstance().createObjects(this);

			this.debugText = this.add.text(10, 10, "", {color: '#333300'});

			TransitionManager.getInstance().init(this, CONST.RESOURCE_KEY.IMG.FILTER, CONST.UI_CAMERA.x, CONST.UI_CAMERA.y, CONST.TRANSITON_IMG_SIZE, CONST.SCREEN.width,  CONST.SCREEN.height, CONST.DEPTH.TRANSITION);
			this.cameras.main.ignore(TransitionManager.getInstance().parent);

			// UIカメラにメインの表示物を除外するのめんどくさいので超遠くに置く作戦
			this.uiCamera = this.cameras.add(0, 0, CONST.SCREEN.width, CONST.SCREEN.height);
			this.uiCamera.setScroll(CONST.UI_CAMERA.x, CONST.UI_CAMERA.y);

			TransitionManager.getInstance().playOpen(this, () => {
				this.setState(GAME_STATE.START);
			}, 0.3);

			this.setupKey();
		}

		setupKey() {
			var onKey = () => {
				if(!!this.nextKeyCallback) {
					this.nextKeyCallback();
					// 一回実行したら消す
					this.nextKeyCallback = undefined;
				}
			}

			// TODO とりあえずスペースキー押下したら、次に進める
			let keyObj = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

			let keyObjEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

			keyObj.on("up", () => {
				onKey();
			});
			keyObjEnter.on("up", () => {
				onKey();
			});
		}

		update() {
			this.debugText.setText([
				"FPS : " + GameManager.getInstance().game.loop.actualFps,
				"version : " + GameManager.getInstance().config.version,
				"Bullet size : " + BulletManager.getInstance().listSize()
			]);

			switch(this.majorState) {
				case GAME_STATE.START:
					this.checkStateInit(() => {
						ObjectManager.getInstance().startPhaseInit(this, () => {
							// 初期化終わったら操作開始フェイズに移行
							this.setState(GAME_STATE.PLAY);
						});
					});
					ObjectManager.getInstance().startPhase(this);
					break;
				case GAME_STATE.PLAY:
					this.checkStateInit(() => {
						ObjectManager.getInstance().playPhaseInit(this);
					});
					ObjectManager.getInstance().playPhase(this, () => {
						this.setState(GAME_STATE.END);
					});

					break;
				case GAME_STATE.END:
					this.checkStateInit(() => {
						ObjectManager.getInstance().endPhaseInit(this);

						// ボタン押下
						this.nextKeyCallback = () => {
							TransitionManager.getInstance().playClose(this, () => {
								this.removeGameScene();
								this.scene.start(CONST.SCENE_KEY.GAME);
							});
						};
					});
					ObjectManager.getInstance().endPhase(this);
					break;
			}
		}

		private setState(state: GAME_STATE) {
			this.majorState = state;
			this.minorState = MINOR_STATE.INIT;
		}

		private checkStateInit(callback : () => void) {
			if (this.minorState === MINOR_STATE.INIT) {
				this.minorState = MINOR_STATE.WAIT;
				callback();
			}
		}

		private removeGameScene() {
			this.destroyObject();
			ParticlesManager.getInstance().destroy();
			TransitionManager.getInstance().destroy();
		}
		private destroyObject() {
			ObjectManager.getInstance().destroyObjects();
			this.physics.world.colliders.destroy();
		}
	}
}
