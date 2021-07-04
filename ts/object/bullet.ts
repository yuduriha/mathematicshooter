namespace mkg.mtsh {
	export class Bullet extends Phaser.Physics.Arcade.Image {
		protected hitCallback: () => void;
		protected velo! :Phaser.Math.Vector2;
		constructor(scene: Phaser.Scene, texture: string, hitCallback: () => void, frame?: string | integer) {
			super(scene, 0, 0, texture, frame);
			scene.add.existing(this);
			scene.physics.add.existing(this);

			this.hitCallback = hitCallback;
			this.setOrigin(0.5);
			// 当たり判定は真円の想定
			this.setCircle(this.width * 0.5);

			this.setActive(false);
			this.setVisible(false);
		}

		public use(x: number, y: number, vx: number, vy: number, param: BulletParame) {
			this.setActive(true);
			this.setVisible(true);

			this.setPosition(x, y);

			this.setVelocity(vx, vy);

			this.velo = new Phaser.Math.Vector2(vx, vy);
		}

		public update() {
			this.angle = Phaser.Math.RadToDeg(this.velo.angle()) + CONST.BULLET.DEFO_ANGLE;
		}

		/**
		 * 画面外に行ったら消すかどうか
		 */
		public isDestroyOutside() : boolean {
			return true;
		}

		public hit() {
			this.hitCallback();
		}
	}
}
