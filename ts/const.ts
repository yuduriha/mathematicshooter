namespace mkg.mtsh {
	/**
	 * ゲームシーンの進行状況
	 */
	export enum GAME_STATE {
		INIT = 0,
		START,
		PLAY,
		END,
	}

	export enum MINOR_STATE {
		INIT = 0,
		WAIT,
	}

	/**
	 * 自機の状態
	 */
	export enum PLAYER_STATE {
		INIT = 0,
		PLAY,     // 行動中
		DEATH,    // 死亡
		WIN,
	}

	export class CONST {
		/**
		 * シーン識別子
		 */
		static readonly SCENE_KEY = {
			PRELOAD: "scene_preload",
			GAME: "scene_game",
		};

		/**
		 * リソース識別子
		 */
		static readonly RESOURCE_KEY = {
			JSON: {
				CONFIG: "json_config",
				ENEMY_SETTING: "enemy_setting"
			},
			IMG: {
				PLAYER:   "img_player",
				ENEMY:    "img_enemy",
				BULET000: "img_bullet_000",
				BULET001: "img_bullet_001",
				BG:       "img_bg",
				SMOKE:    "img_smoke",
				FILTER:   "img_filter",
				WIN:      "img_win",
				LOSE:     "img_lose",
				TAP:      "img_tap",
			}
		};

		/**
		 * 画面サイズ
		 */
		static readonly SCREEN = {
			width : 600,
			height: 800,
		};

		/**
		 * 画面中心
		 */
		static readonly SCREEN_CENTER = {
			x: CONST.SCREEN.width / 2,
			y: CONST.SCREEN.height / 2,
		};

		/**
		 * ゲームエリアサイズ
		 */
		static readonly GAME_AREA = {
			x: 0,
			y: 0,
			width : 600,
			height: 800,
		};
		static readonly GAME_AREA_RECT = {
			right: CONST.GAME_AREA.x + CONST.GAME_AREA.width,
			left: CONST.GAME_AREA.x,
			top: CONST.GAME_AREA.y,
			bottom: CONST.GAME_AREA.y +CONST.GAME_AREA.height,
		};
		/**
		 * ゲームエリア中心
		 */
		static readonly GAME_AREA_CENTER = {
			x: CONST.GAME_AREA.width / 2 + CONST.GAME_AREA.x,
			y: CONST.GAME_AREA.height / 2 + CONST.GAME_AREA.y,
		};

		/**
		 * 自機関連
		 */
		static readonly PLAYER = {
			SPEED: 200,
			START: {
				x: CONST.SCREEN_CENTER.x,
				y: {
					from: CONST.SCREEN.height + 50,
					to: CONST.SCREEN.height - 150,
				},
				duration: 1000
			},
			HIT_DIAMETER: 0.25, // 円当たり判定の直径の割合(直径と同じ場合1、外接する場合は0.5)
			BULLET: {
				INTERVAL: 500,
				SPEED: -250,
				SHOT_OFFSET: [
					{x: 0, y: -50}, {x: 0, y: -20},
					{x: 25, y: -25}, {x: 25, y: 0},
					{x: -25, y: -25}, {x: -25, y: 0},
				]
			},
			DEATH_EXPLOSION_INTERVAL: 600
		};

		/**
		 * 敵機関連
		 */
		static readonly ENEMY = {
			// 初期配置する画面外座標
			START: {
				x: CONST.SCREEN_CENTER.x,
				y: -100
			}
		};
		static readonly BG = {
			TILE_SIZE: {
				w: 400,
				h: 400
			},
			SPEED: 2
		};

		static readonly BULLET = {
			DEFO_ANGLE: 90
		};

		static readonly PARTICLES_COUNT = {
			EXPLOSION: 26,
			PLAYER_DEATH:64
		};

		static readonly UI_CAMERA = {
			x: 10000,
			y: 0,
		};

		/**
		 * 描画順
		 */
		static readonly DEPTH = {
			GAME_OBJ: 0,
			TRANSITION: 200
		}

		static readonly TRANSITON_IMG_SIZE = 64;
	}
}
