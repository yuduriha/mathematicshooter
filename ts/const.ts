namespace mkg.mtsh {
	export class CONST {
		/**
		 * 画面サイズ
		 */
		static readonly SCREEN = {
			width : 1136,
			height: 640,
		};

		/**
		 * シーン識別子
		 */
		static readonly SCENE_KEY = {
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
			}
		};
	}
}