namespace mkg.mtsh {
	export class CONST {
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
			INIT_POS: {
				x: CONST.SCREEN_CENTER.x,
				y: 700
			},
			HIT_DIAMETER: 0.25 // 円当たり判定の直径の割合(直径と同じ場合1、外接する場合は0.5)
		};

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
			},
			IMG: {
				PLAYER: "img_player",
				ENEMY:  "img_enemy",
				BULET:  "img_bullet",
			}
		};
	}
}