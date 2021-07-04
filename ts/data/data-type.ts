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
			// 発射タイプ引数
			parame?: ShotParame;
			// 弾引数
			bullet: BulletParame;
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
		// 発射タイプ
		type: number;
		angle_rate?: number; // 変化割合 (durationの時間でどれだけ角度を付けるか)
		angle_start?: number; // 開始角度
		shot_count?: number; // 一度に発射する数
		angle_step?: number; // 複数発射するときにずらす角度
		angle_repeat_delta?: number; // 繰り返し動作中に発射角をずらす量
		repeat?: { // 発射が終わったら一定ステップ戻って繰り返す
			back_step: number; // 戻るステップ数
			count: number; // 繰り返す回数
		};
	};

	export type BulletParame = {
		type?: number;
		velo?: number;
		angle_rate?: number;
	};
}
