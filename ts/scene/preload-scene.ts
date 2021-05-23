namespace mkg.mtsh {
	export class PreloadScene extends Phaser.Scene　{
		constructor() {
			super(CONST.SCENE_KEY.PRELOAD);
		}

		preload() {
			this.load.json(CONST.RESOURCE_KEY.JSON.CONFIG, "assets/json/config.json");
		}
		create() {
			GameManager.getInstance().setConfig(this);
			console.log("game version : " + GameManager.getInstance().config.version);
		}
		update() {
			this.scene.start(CONST.SCENE_KEY.GAME);
		}
	}
}