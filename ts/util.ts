namespace mkg.util {

	export type Rect = {
		x: number, y: number, w : number, h: number
	}

	export function convRect(x: number, y: number, w : number, h: number) : Rect {
		return {x: x, y: y, w: w, h: h}
	}
	/**
	 * 配列の最初に条件を満たした要素を返すやつ。本当にデフォでないの？
	 * @param arr 配列
	 * @param condition 条件
	 */
	export function find<T>(arr: Array<T>, condition: (e: T) => boolean) : T | null{
		for(let i = 0; i < arr.length; ++i) {
			if(condition(arr[i])) {
				return arr[i];
			}
		}
		return null;
	}

	/**
	 * 極座標を直交座標に変換
	 * @param x 原点位置
	 * @param y 
	 * @param r 半径
	 * @param angle 角度(deg)
	 */
	export function polarCoord(x: number, y:number, r: number, angle: number) : {x: number, y: number}{
		let dir = newVector2(r, angle);
		return {
			x: x + dir.x,
			y: y + dir.y
		}
	}

	/**
	 * ベクトル作成
	 * @param r ベクトルの長さ
	 * @param angle ベクトルの向き(deg)
	 */
	export function newVector2(r: number, angle: number) : Phaser.Math.Vector2 {
		return new Phaser.Math.Vector2(
			r * Math.cos(Phaser.Math.DegToRad(angle)), 
			r * Math.sin(Phaser.Math.DegToRad(angle)));
	}

	/**
	 * 角度の差
	 * @param a 角度(deg -180 ~ +180)
	 * @param b 角度(deg -180 ~ +180)
	 */
	export function subtractAngle(a: number, b: number) : number {
		let result = a - b;

		if(result < -180) {
			return result + 360;
		} else if (result > 180) {
			return result - 360;
		}
		return result;
	}

	/**
	 * 円の中に点が入っているか
	 * @param cx 円の座標
	 * @param cy 
	 * @param r 円の半径
	 * @param tx ターゲットの座座標
	 * @param ty 
	 */
	export function hitCirclePoint(cx: number, cy: number, r: number, tx: number, ty: number) {
		return (cx - tx) * (cx - tx) + (cy - ty) * (cy - ty) <= r * r;
	}

	/**
	 * 矩形の中に点が入っているか
	 * @param bx 矩形の座標
	 * @param by 
	 * @param bw 矩形の幅/高さ
	 * @param bh
	 * @param tx ターゲットの座座標
	 * @param ty 
	 */
	export function hitBoxPoint(bx: number, by: number, bw: number, bh: number, tx: number, ty: number) {
		return (bx - bw * 0.5) <= tx && tx <= (bx + bw * 0.5) && (by - bh * 0.5) <= ty && ty <= (by + bh * 0.5);
	}

	/**
	 * 矩形同士の当たり判定(回転非対応)
	 */
	export function hitBox2Box(a: Rect, b: Rect): boolean {
		let dx = a.x - b.x;
		let dy = a.y - b.y;
		let sw = (a.w + b.w) * 0.5;
		let sh = (a.h + b.h) * 0.5;

		return (dx * dx <= sw * sw) && (dy * dy <= sh * sh);
	}

	/**
	 * 目標に向かって回転する
	 * @param angle 現在の角度
	 * @param pos 現在の位置
	 * @param target 目標位置
	 * @param limit 角移動量限界
	 */
	export function rot(angle: number, pos: Phaser.Math.Vector2, target: Phaser.Math.Vector2, limit: number) {
		// 目標のなす角
		let dir = Phaser.Math.RadToDeg(Phaser.Math.Angle.BetweenPoints(pos, target));

		// 目標と今の角度の差
		let delta = util.subtractAngle(angle, dir);
		
		// 移動量のアンダーフロー・オーバーフロー
		if(limit < delta) {
			delta = limit;
		} else if(delta < -limit) {
			delta = - limit;
		}
		return angle - delta;
	}
}