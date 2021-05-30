namespace mkg.mtsh {
	const DEFAULT_ANGLR = -Phaser.Math.TAU;
	export class Annulus {
		private x: number;
		private y: number;
		private r: number; // 半径
		private w: number; // 線の太さ
		private color: number;
		private alpha: number;
		private _graphics: Phaser.GameObjects.Graphics;
		public get graphics() {return this._graphics;};
		public constructor(scene: Phaser.Scene, x: number, y: number, r: number, w: number, startAngle: number, endAngle: number, color: number, alpha: number) {
			this.x = x;
			this.y = y;
			this.r = r;
			this.w = w;
			this.color = color;
			this.alpha = alpha;
			this._graphics = new Phaser.GameObjects.Graphics(scene);

			this.drow(startAngle, endAngle);

			scene.add.existing(this._graphics);
		}
		private drow(startAngle: number, endAngle: number) {
			this._graphics.clear();
			this._graphics.lineStyle(this.w, this.color, this.alpha);
			this._graphics.beginPath();
			this._graphics.arc(this.x, this.y, this.r, startAngle + DEFAULT_ANGLR, endAngle + DEFAULT_ANGLR);
			this._graphics.strokePath();
			this._graphics.closePath()
		}

		update(startAngle: number, endAngle: number) {
			this.drow(startAngle, endAngle);
		}
	}
}
