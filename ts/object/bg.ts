namespace mkg.mtsh {
	export class Bg {
		private static instance: Bg;
		private bgList: Phaser.GameObjects.Image[] = [];
		private constructor() {
		}

		public static getInstance(): Bg {
			if(!Bg.instance) {
				Bg.instance = new Bg();
			}

			return Bg.instance;
		}

		public create(scene: Phaser.Scene, img: string) {
			let col = Math.ceil(CONST.GAME_AREA.width / CONST.BG.TILE_SIZE.w);
			let row = Math.ceil(CONST.GAME_AREA.height / CONST.BG.TILE_SIZE.h);
			for(let y = -1; y < row; ++y) {
				for(let x = 0; x < col; ++x) {
					let image = scene.add.image(CONST.GAME_AREA.x + x * CONST.BG.TILE_SIZE.w, CONST.GAME_AREA.y + y * CONST.BG.TILE_SIZE.h, img);
					image.setOrigin(0, 0);
					this.bgList.push(image);
				}
			}
		}

		public update() {
			// 背景スクロール
			this.bgList.forEach((bg) => {
				bg.y += CONST.BG.SPEED;

				if(bg.y > CONST.GAME_AREA.height) {
					bg.y -= CONST.GAME_AREA.height + CONST.BG.TILE_SIZE.h;
				}
			});
		}
	}
}