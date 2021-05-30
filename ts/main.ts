namespace mkg.mtsh {
	window.onload = () => {
		run();
	};
	/**
	 * エントリポイント
	 */
	function run() : void {
		let config = {
			type: Phaser.CANVAS,
			parent: 'phaser-canvas',
			width: CONST.SCREEN.width,
			height: CONST.SCREEN.height,
			scale: {
				mode: Phaser.Scale.FIT,
				autoCenter: Phaser.Scale.CENTER_BOTH
			},
			physics: {
				default: 'arcade',
				arcade: {
					debug: true
				}
			},
			scene: [
				PreloadScene,
				GameScene,
			],
			fps: {
				target: 60
			}
		};
		let game = new Phaser.Game(config);
		GameManager.create(game);
	}
}
