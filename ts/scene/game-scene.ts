namespace mkg.mtsh {
	export class GameScene extends Phaser.Scene {
		private debugText!: Phaser.GameObjects.Text;
		constructor() {
			super(CONST.SCENE_KEY.GAME);
		}
		preload() {
			this.load.image(CONST.RESOURCE_KEY.IMG.PLAYER, "assets/img/player.png");
			this.load.image(CONST.RESOURCE_KEY.IMG.ENEMY, "assets/img/enemy.png");
			this.load.image(CONST.RESOURCE_KEY.IMG.BULET, "assets/img/bullet000.png");
		}
		create() {
			ObjectManager.getInstance().createObjects(this);

			this.debugText = this.add.text(10, 10, "", {color: '#00ff00'});
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