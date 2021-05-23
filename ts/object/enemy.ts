namespace mkg.mtsh {
	export class Enemy extends Phaser.Physics.Arcade.Image {
		private frameCounter: number;
		constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | integer) {
			super(scene, x, y, texture, frame);
			scene.add.existing(this);
			scene.physics.add.existing(this);

			this.setOrigin(0.5);
			this.setCircle(this.width * 0.5);

			this.frameCounter = 0;
		}

		public update(scene: Phaser.Scene) {
			++this.frameCounter;

			if(this.frameCounter % 30 === 0) {
				let velo = util.newVector2(200, this.frameCounter * 0.5);
				BulletManager.getInstance().use(this.x, this.y, velo.x, velo.y, CONST.RESOURCE_KEY.IMG.BULET001, (b: Bullet) => {
					ObjectManager.getInstance().setCollderBullet(b);
				});
			}
		}

		public hit() {

		}
	}
}
