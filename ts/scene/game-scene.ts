namespace mkg.mtsh {
	export class GameScene extends Phaser.Scene {
		private debugText!: Phaser.GameObjects.Text;
		constructor() {
			super(CONST.SCENE_KEY.GAME);
		}
		preload() {
			this.load.image(CONST.RESOURCE_KEY.IMG.PLAYER, "assets/img/character_takenoko.png");
			this.load.image(CONST.RESOURCE_KEY.IMG.ENEMY, "assets/img/character_kinoko.png");
			this.load.image(CONST.RESOURCE_KEY.IMG.BULET000, "assets/img/takenoko_bamboo_shoot.png");
			this.load.image(CONST.RESOURCE_KEY.IMG.BULET001, "assets/img/kinoko.png");
			this.load.image(CONST.RESOURCE_KEY.IMG.BG, "assets/img/pattern_shibafu.png");

		}
		create() {
			ObjectManager.getInstance().createObjects(this);

			this.debugText = this.add.text(10, 10, "", {color: '#333300'});
		}
		update() {
			ObjectManager.getInstance().update(this);
			this.debugText.setText([
				"FPS : " + GameManager.getInstance().game.loop.actualFps,
				"Bullet size : " + BulletManager.getInstance().listSize()
			]);
		}
	}
}
