namespace mkg.mtsh {
	export class GameManager {
		private static instance: GameManager;
		private _game: Phaser.Game;
		private _config!: Config;
		private _enemySetting!: EnemySetting;
		private constructor(game: Phaser.Game) {
			this._game = game;
		}

		public static create(game: Phaser.Game) {
			if(!GameManager.instance) {
				GameManager.instance = new GameManager(game);
			}
		}

		public static getInstance(): GameManager {
			return GameManager.instance;
		}

		public get game(): Phaser.Game {
			return this._game;
		}

		public setConfig(scene: Phaser.Scene): Config {
			this._config = scene.cache.json.get(CONST.RESOURCE_KEY.JSON.CONFIG);
			return this._config;
		}

		public get config() {return this._config};

		public setEnemySetting(scene: Phaser.Scene): Config {
			this._enemySetting = scene.cache.json.get(CONST.RESOURCE_KEY.JSON.ENEMY_SETTING);
			return this._enemySetting;
		}

		public get enemySetting() {return this._enemySetting};

		/**
		 * ゲームシーン取得
		 */
		public get gameScene(): Phaser.Scene {
			return this._game.scene.getScene(CONST.SCENE_KEY.GAME);
		}
	}
}
