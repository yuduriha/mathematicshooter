namespace mkg.mtsh {
	export class ParticlesManager {
		private static instance: ParticlesManager;
		private explosionEmitter!: Phaser.GameObjects.Particles.ParticleEmitter;
		private playerDeathEmitter!: Phaser.GameObjects.Particles.ParticleEmitter;
		private constructor() {
		}

		public static getInstance(): ParticlesManager {
			if(!ParticlesManager.instance) {
				ParticlesManager.instance = new ParticlesManager();
			}

			return ParticlesManager.instance;
		}

		public init(scene: Phaser.Scene) {
			this.explosionEmitter = scene.add.particles(CONST.RESOURCE_KEY.IMG.SMOKE).createEmitter({
				x: 0,
				y: 0,
				speed: {min: 20, max: 100},
				angle: {min: 0, max: 360},
				scale: {start: 1, end: 0},
				alpha: {start: 0, end: 0.1},
				lifespan: 1000,
				quantity: 0,
				frequency: 500,
			});
			this.playerDeathEmitter = scene.add.particles(CONST.RESOURCE_KEY.IMG.SMOKE).createEmitter({
				x: 0,
				y: 0,
				speed: {min: 20, max: 150},
				angle: {min: 0, max: 360},
				scale: {start: 1, end: 0},
				alpha: {start: 0, end: 0.1},
				lifespan: 1000,
				quantity: 0,
				frequency: 500,
			});
		}

		public destroy() {
			this.explosionEmitter.remove();
			this.playerDeathEmitter.remove();
		}

		public explosion(count: number, x: number, y: number) {
			this.explosionEmitter.explode(count, x, y);
		}

		public playerDeath(count: number, x: number, y: number) {
			this.playerDeathEmitter.explode(count, x, y);
		}
	}
}
