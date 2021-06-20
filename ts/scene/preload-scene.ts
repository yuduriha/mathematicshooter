namespace mkg.mtsh {
	export class PreloadScene extends Phaser.Scene　{
		constructor() {
			super(CONST.SCENE_KEY.PRELOAD);
		}

		preload() {
			this.load.json(CONST.RESOURCE_KEY.JSON.CONFIG, "assets/json/config.json");
			this.load.json(CONST.RESOURCE_KEY.JSON.ENEMY_SETTING, "assets/json/enemy_setting.json");
			this.load.image(CONST.RESOURCE_KEY.IMG.PLAYER, "assets/img/character_takenoko.png");
			this.load.image(CONST.RESOURCE_KEY.IMG.ENEMY, "assets/img/character_kinoko.png");
			this.load.image(CONST.RESOURCE_KEY.IMG.BULET000, "assets/img/takenoko_bamboo_shoot.png");
			this.load.image(CONST.RESOURCE_KEY.IMG.BULET001, "assets/img/kinoko.png");
			this.load.image(CONST.RESOURCE_KEY.IMG.BG, "assets/img/pattern_shibafu.png");
			this.load.image(CONST.RESOURCE_KEY.IMG.SMOKE, "assets/img/bakuhatsu1.png");
			this.load.image(CONST.RESOURCE_KEY.IMG.FILTER, "assets/img/filter.png");
			this.load.image(CONST.RESOURCE_KEY.IMG.WIN, "assets/img/text_win.png");
			this.load.image(CONST.RESOURCE_KEY.IMG.LOSE, "assets/img/text_lose.png");
		}
		create() {
			GameManager.getInstance().setConfig(this);
			GameManager.getInstance().setEnemySetting(this);
			console.log("game version : " + GameManager.getInstance().config.version);
		}
		update() {
			this.scene.start(CONST.SCENE_KEY.GAME);
		}
	}
}
