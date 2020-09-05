namespace mkg.mtsh {
	export class BulletManager {
		// なんかオブジェクトプールうまく行っていない。当たり判定が消せてない
		private static instance: BulletManager;
		private bulletList: Bullet[] = [];
		private constructor() {
		}

		public static getInstance(): BulletManager {
			if(!BulletManager.instance) {
				BulletManager.instance = new BulletManager();
			}

			return BulletManager.instance;
		}

		/**
		 * 弾破棄
		 */
		public destroyBulletAll() {
			this.bulletList.forEach((b: Bullet) => {
				b.destroy(true);
			});
			this.bulletList = [];
		}

		private createBullet(scene: Phaser.Scene): Bullet{
			let bullet = new Bullet(scene, CONST.RESOURCE_KEY.IMG.BULET,() => {
				bullet.destroy(true);
				// オブジェクトプールうまく行ったらここいらない
				this.bulletList = this.bulletList.filter((b: Bullet) => {
					return b != bullet;
				});
			});
			this.bulletList.push(bullet);
			return bullet;
		}

		/**
		 * 弾使用
		 * @param x 
		 * @param y 
		 * @param angle 発射角度
		 * @param bulletData 
		 * @param setCollider 新規に作成した際に設定する当たり判定
		 */
		public use(x: number, y: number, vx: number, vy:number, setCollider:(bullet: Bullet) => void) {
			let bullet = this.createBullet(GameManager.getInstance().gameScene);
			setCollider(bullet);
			
			bullet.use(x, y, vx, vy);
		}

		public listSize(): number {
			return this.bulletList.length;
		}

		public update() {
			// オブジェクトプールうまく行ったらここいらない
			this.bulletList = this.bulletList.filter((bullet: Bullet) => {
				// 画面外に行った弾は消す
				if(bullet.isDestroyOutside() && outsideGameArea(bullet.x, bullet.y, bullet.width, bullet.width)) {
					bullet.destroy(true);
					return false;
				}

				return true;
			});
		}
	}
}