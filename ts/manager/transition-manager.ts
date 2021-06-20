namespace mkg.mtsh {

	const TWEEN_PARAM = {
		0: 700,
		1: 1000,
		2: 50,
		3: 500
	};
	export class TransitionManager {
		private static instance: TransitionManager;
		private _parent!: Phaser.GameObjects.Group;
		private imgList!: Phaser.GameObjects.Image[][];
		private col!: number;
		private row!: number;
		private scaleX!: number;
		private scaleY!: number;

		public get parent() {return this._parent;}

		private constructor() {
		}

		public static getInstance(): TransitionManager {
			if(!TransitionManager.instance) {
				TransitionManager.instance = new TransitionManager();
			}

			return TransitionManager.instance;
		}

		public init(scene: Phaser.Scene, texture: string, x: number, y: number, size: number, sw: number, sh: number, depth: number) {

			this.col = Math.ceil(sw / size) + 1;
			this.row = Math.ceil(sh / size) + 1;

			this._parent = scene.add.group();
			this.imgList = [];
			for(let j = 0; j < this.row; ++j) {
				this.imgList[j] = [];
				for(let i = 0; i < this.col; ++i) {
					let img = scene.add.image(0, 0, texture);
					img.setOrigin(0.5);

					if(i === 0 && j === 0) {
						this.scaleX = size / img.width;
						this.scaleY = size / img.height;
					}
					img.setScale(this.scaleX, this.scaleY)

					this._parent.add(img);

					this.imgList[j][i] = img;
					img.setPosition(this.scaleX * img.width * (i + 0.5), this.scaleY * img.height * (j + 0.5));
				}
			}

			this._parent.setDepth(depth);
			this._parent.incXY(x, y);
		}
		public destroy() {
			this.imgList = [];
			this._parent.destroy(true);
		}

		/**
		 * 幕が閉じる
		 * @param scene
		 * @param complete
		 */
		public playClose(scene: Phaser.Scene, complete: () => void) {
			this._parent.setVisible(true);
			for(let j = 0; j < this.row; ++j) {
				for(let i = 0; i < this.col; ++i) {
					this.imgList[j][i].scale = 0;
					this.imgList[j][i].angle = 0;
					let config = this.creatTweenConfg(this.imgList[j][i], i, j, this.scaleX, this.scaleY);
					scene.tweens.add(config);
				}
			}

			let interval = this.getInterval(this.col, this.row);

			// 終わったら通知
			window.setTimeout(() => {
				complete();
			}, interval);
		}

		/**
		 * 幕が開く
		 * @param scene
		 * @param complete
		 */
		public playOpen(scene: Phaser.Scene, complete: () => void, completeIntervalRate: number = 1) {
			this._parent.setVisible(true);
			for(let j = 0; j < this.row; ++j) {
				for(let i = 0; i < this.col; ++i) {
					this.imgList[j][i].setScale(this.scaleX, this.scaleY);
					this.imgList[j][i].angle = 0;
					let config = this.creatTweenConfg(this.imgList[j][i], this.col - i - 1, this.row - j - 1, 0, 0);
					scene.tweens.add(config);
				}
			}

			let interval = this.getInterval(this.col, this.row);

			// 終わったら消す
			window.setTimeout(() => {
				this._parent.setVisible(false);
			}, interval);

			// 終わったことを通知
			window.setTimeout(() => {
				complete();
			}, interval * completeIntervalRate); // 早めに知りたいとき
		}
		private creatTweenConfg(target: Phaser.GameObjects.Image ,i: number, j:number, scaleX: number, scaleY: number) {
			let l = (i % 2) == (j % 2);
			return {
				targets: target,
				scaleX: scaleX,
				scaleY: scaleY,
				angle: l ? 180 : -180,
				duration: l ? TWEEN_PARAM[0] : TWEEN_PARAM[1],
				delay: (i + j) * TWEEN_PARAM[2] + (l ? 0 : TWEEN_PARAM[3]),
				repeat: 0,
			};
		}

		private getInterval(i: number, j:number) {
			return TWEEN_PARAM[1] + (i + j) * TWEEN_PARAM[2] + TWEEN_PARAM[3];
		}
	}
}
