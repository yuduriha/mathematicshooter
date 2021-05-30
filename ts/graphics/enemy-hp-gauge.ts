namespace mkg.mtsh {
	const WIDTH = 10;
	const COLOR = 0x612c16;
	const ALPHA = 0.6;
	export class EnemyHpGauge {
		private maxHp: number;
		private annulus: Annulus;
		public get graphics() {return this.annulus.graphics;};
		public constructor(scene:Phaser.Scene, maxHp: number, r: number) {
			this.maxHp = maxHp;
			this.annulus = new Annulus(scene, 0, 0, r, WIDTH, 0, Phaser.Math.PI2, COLOR, ALPHA);
		}

		public update(hp: number) {
			let startAngle = (1 - hp / this.maxHp) * Phaser.Math.PI2;
			let endAngle = Phaser.Math.PI2;
			this.annulus.update(startAngle, endAngle);
		}

		public destroy() {
			this.annulus.graphics.destroy(true);
		}
	}
}
