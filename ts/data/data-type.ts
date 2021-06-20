namespace mkg.mtsh {
	/**
	 * 設定ファイルconfig.jsonの構成
	 */
	export type Config = {
		version: string; // ゲームバージョン
	}

	/**
	 * 設定ファイルconfig.jsonの構成
	 */
	export type EnemySetting = {
		version: string; // データバージョン
		max_hp: number;  // 最大HP
		move_pattern: { // 挙動パターン
			// 期間
			duration: number;
			// 移動
			move: EnemySettingMove;
		}[];
		shot_pattern: { // 弾発射パターン
			// 期間
			duration: number;
			// 間隔
			interval: number;
			// 発射タイプ
			type: number;
			// 発射タイプ引数
			parame?: ShotParame;
		}[];
	}

	export type EnemySettingMove = {
		x: {
			from: number,
			to: number
		};
		y: {
			from: number,
			to: number
		};
		end?: {
			x: number,
			y: number
		};
		// TODO イージングとかつけていいのでは？
	};

	export type ShotParame = {
		velo? : number;
		angle_rate?: number;
	};
}
