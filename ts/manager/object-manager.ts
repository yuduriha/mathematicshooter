namespace mkg.mtsh {
	export class ObjectManager {
		private static instance: ObjectManager;

		private _player!: Player;
		private enemyList: Enemy[] = [];

		public get player() {
			return this._player;
		}
		private constructor() {
		}

		public static getInstance(): ObjectManager {
			if(!ObjectManager.instance) {
				ObjectManager.instance = new ObjectManager();
			}

			return ObjectManager.instance;
		}

		public destroyObjects() {
			// 自機
			this._player.destroy(true);
			// 敵機
			this.enemyList.forEach((e: Enemy) => {
				e.destroy();
			});
			this.enemyList = [];
			// 弾
			BulletManager.getInstance().destroyBulletAll();
		}

		public createObjects(scene: Phaser.Scene) {
			// 背景作成
			Bg.getInstance().create(scene, CONST.RESOURCE_KEY.IMG.BG);

			// 自機作成
			this._player = new Player(scene, CONST.PLAYER.INIT_POS.x, CONST.PLAYER.INIT_POS.y, CONST.RESOURCE_KEY.IMG.PLAYER);
			// 敵機作成
			this.createEnemy(scene);
		}

		public update(scene: Phaser.Scene) {
			Bg.getInstance().update();

			this._player.update(scene);

			this.enemyList.forEach((e) => {
				e.update(scene);
			});

			BulletManager.getInstance().update();
		}

		private createEnemy(scene: Phaser.Scene) {
			//stageData.enemy_list.forEach((enemyData: EnemyJsonData, index)=> {
				// let enemy = new Enemy(scene, index, unitSize, enemyData, stageData,(targetID: number) => {
				// 	this.enemyList = this.enemyList.filter((e: Enemy) => {
				// 		return e !== enemy;
				// 	});
				// 	this.breaktTrget(true, targetID);

				// 	enemy.destroy();
				// }, GameManager.getInstance().config.enemy_texture.pivot_x[enemyData.img]);

				let enemy = new Enemy(scene, CONST.SCREEN_CENTER.x, 200, CONST.RESOURCE_KEY.IMG.ENEMY);

				// 自機との当たり判定
				scene.physics.add.collider(enemy, this._player);
				scene.physics.add.overlap(this._player, enemy, (p: Phaser.GameObjects.GameObject) => {
					this.colliderPlayerToEnemy(p);
				}, undefined, scene);

				this.enemyList.push(enemy);
			//});
		}

		/***
		 * 弾の当たり判定設定
		 */
		public setCollderBullet(bullet: Bullet) {
			let scene = GameManager.getInstance().gameScene;
			
			// 自機との当たり判定
			scene.physics.add.overlap(bullet, this.player, (b: Phaser.GameObjects.GameObject, p: Phaser.GameObjects.GameObject) => {
				(<Bullet>b).hit();
				this.hitPlayer(<Player>p);
			}, undefined, scene);
		}

		/**
		 * 自機の弾の当たり判定
		 */
		public setCollderPlayerBullet(bullet: Bullet) {
			let scene = GameManager.getInstance().gameScene;
			
			this.enemyList.forEach((enemy) => {
				scene.physics.add.overlap(bullet, enemy, (b: Phaser.GameObjects.GameObject, e: Phaser.GameObjects.GameObject) => {
					(<Bullet>b).hit();
					(<Enemy>e).hit();
					
				}, undefined, scene);
			});
		}

		/**
		 * 自機と敵の当たり判定コールバック
		 * @param p 
		 */
		private colliderPlayerToEnemy(p: Phaser.GameObjects.GameObject) {
	//		this.hitPlayer(<Player>p);
		}

		/**
		 * 自機被弾処理
		 * @param p 
		 */
		private hitPlayer(p: Player) {

// 			// 操作中なら死亡
// 			if(this._playerState === PLAYER_STATE.PLAY) {
// 				p.hit();
// //				this._playerState = PLAYER_STATE.DEATH;
// 			}
		}
	}
}