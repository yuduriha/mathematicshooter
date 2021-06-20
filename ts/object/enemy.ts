namespace mkg.mtsh {
	export class Enemy {
		private _image: Phaser.Physics.Arcade.Image;
		private hp: number;
		private container: Phaser.GameObjects.Container;
		private hpGauge: EnemyHpGauge;
//		private frameCounter: number;
		public get body() {return <Phaser.Physics.Arcade.Body>this.container.body;}
		public get image() {return this._image;}
		constructor(scene: Phaser.Scene, x: number, y: number, texture: string, hp: number) {

			// 画像本体生成
			this._image = new Phaser.Physics.Arcade.Image(scene, 0, 0, texture);
			scene.add.existing(this._image);
			scene.physics.add.existing(this._image);
			this._image.setOrigin(0.5);
			this._image.setCircle(this._image.width * 0.5);

			// 体力ゲージ生成
			this.hp = hp;
			this.hpGauge = new EnemyHpGauge(scene, this.hp, this._image.width / 2 + 10);

			this.container = scene.add.container(x, y, [this._image, this.hpGauge.graphics]);
			scene.physics.add.existing(this.container);

//			this.frameCounter = 0;
		}

		public update(scene: Phaser.Scene) {
			// ++this.frameCounter;

			// if(this.frameCounter % 30 === 0) {
			// 	let velo = util.newVector2(200, this.frameCounter * 0.5);
			// 	BulletManager.getInstance().use(this.container.x, this.container.y, velo.x, velo.y, CONST.RESOURCE_KEY.IMG.BULET001, (b: Bullet) => {
			// 		ObjectManager.getInstance().setCollderBullet(b);
			// 	});
			// }

			//(<Phaser.Physics.Arcade.Body>this.container.body).setVelocity(100 * Math.cos(0.01 * this.frameCounter), 100 * Math.sin(0.01 * this.frameCounter));
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
			this._image.destroy(true);
			this.hpGauge.destroy();
			this.container.destroy(true);
		}
	}
}
