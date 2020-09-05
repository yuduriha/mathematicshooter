namespace mkg.mtsh {
	/**
	 * ゲームエリア外にオブジェクトがあるか。(矩形判定)
	 */
	export function outsideGameArea(x: number, y: number, w : number, h: number) : boolean {
		return !util.hitBox2Box(util.convRect(x, y, w, h), util.convRect(CONST.GAME_AREA_CENTER.x, CONST.GAME_AREA_CENTER.y, CONST.GAME_AREA.width, CONST.GAME_AREA.height));
	}
}