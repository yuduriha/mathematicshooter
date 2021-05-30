namespace mkg.mtsh {
	export class ObjectManager {
		private static instance: ObjectManager;

		private _player!: Player;
		private enemyList: Enemy[] = [];
		private playerDeathTimer?: Phaser.Time.TimerEvent|null;

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
			if(this.playerDeathTimer) {
				this.playerDeathTimer.destroy();
				this.playerDeathTimer = null;
			}
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
			// 爆発管理初期化
			ParticlesManager.getInstance().init(scene);
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
			let enemy = new Enemy(scene, CONST.SCREEN_CENTER.x, 200, CONST.RESOURCE_KEY.IMG.ENEMY, 100);

			// 自機との当たり判定
			scene.physics.add.overlap(this._player, enemy.image, (p: Phaser.GameObjects.GameObject) => {
				this.colliderPlayerToEnemy(p);
			}, undefined, scene);

			this.enemyList.push(enemy);
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
				scene.physics.add.overlap(bullet, enemy.image, (b: Phaser.GameObjects.GameObject, e: Phaser.GameObjects.GameObject) => {
				// 爆発演出再生
				ParticlesManager.getInstance().explosion(CONST.PARTICLES_COUNT.EXPLOSION, bullet.x, bullet.y);
					bullet.hit();
					enemy.hit();
				}, undefined, scene);
			});
		}

		/**
		 * 自機と敵の当たり判定コールバック
		 * @param p
		 */
		private colliderPlayerToEnemy(p: Phaser.GameObjects.GameObject) {
			this.hitPlayer(<Player>p);
		}

		/**
		 * 自機被弾処理
		 * @param p
		 */
		private hitPlayer(p: Player) {
			// 操作中なら死亡
//			if(this._playerState === PLAYER_STATE.PLAY) {
				let scene = GameManager.getInstance().gameScene;

				// 一旦爆発作って、繰り返し
				let create = () => {
					let offset = 80;
					let x = (<Player>p).x + (Math.random() - 0.5) * offset;
					let y = (<Player>p).y + (Math.random() - 0.5) * offset;
					ParticlesManager.getInstance().playerDeath(CONST.PARTICLES_COUNT.PLAYER_DEATH, x, y);
				};

				create();
				this.playerDeathTimer = scene.time.addEvent({
					loop: true,
					delay: CONST.PLAYER.DEATH_EXPLOSION_INTERVAL,
					callback: () => {
						create();
					}
				});

	//			this.postDeathPlayer();

				// MEMO 無敵にするならコココメントあうと
				//this._playerState = PLAYER_STATE.DEATH;
			//}
		}
	}
}
