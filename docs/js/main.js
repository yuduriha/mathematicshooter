"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var mkg;
(function (mkg) {
    var mtsh;
    (function (mtsh) {
        var GAME_STATE;
        (function (GAME_STATE) {
            GAME_STATE[GAME_STATE["INIT"] = 0] = "INIT";
            GAME_STATE[GAME_STATE["START"] = 1] = "START";
            GAME_STATE[GAME_STATE["PLAY"] = 2] = "PLAY";
            GAME_STATE[GAME_STATE["END"] = 3] = "END";
        })(GAME_STATE = mtsh.GAME_STATE || (mtsh.GAME_STATE = {}));
        var MINOR_STATE;
        (function (MINOR_STATE) {
            MINOR_STATE[MINOR_STATE["INIT"] = 0] = "INIT";
            MINOR_STATE[MINOR_STATE["WAIT"] = 1] = "WAIT";
        })(MINOR_STATE = mtsh.MINOR_STATE || (mtsh.MINOR_STATE = {}));
        var PLAYER_STATE;
        (function (PLAYER_STATE) {
            PLAYER_STATE[PLAYER_STATE["INIT"] = 0] = "INIT";
            PLAYER_STATE[PLAYER_STATE["PLAY"] = 1] = "PLAY";
            PLAYER_STATE[PLAYER_STATE["DEATH"] = 2] = "DEATH";
            PLAYER_STATE[PLAYER_STATE["WIN"] = 3] = "WIN";
        })(PLAYER_STATE = mtsh.PLAYER_STATE || (mtsh.PLAYER_STATE = {}));
        var CONST = (function () {
            function CONST() {
            }
            CONST.SCENE_KEY = {
                PRELOAD: "scene_preload",
                GAME: "scene_game",
            };
            CONST.RESOURCE_KEY = {
                JSON: {
                    CONFIG: "json_config",
                },
                IMG: {
                    PLAYER: "img_player",
                    ENEMY: "img_enemy",
                    BULET000: "img_bullet_000",
                    BULET001: "img_bullet_001",
                    BG: "img_bg",
                    SMOKE: "img_smoke",
                    FILTER: "img_filter",
                    WIN: "img_win",
                    LOSE: "img_lose",
                    TAP: "img_tap",
                }
            };
            CONST.SCREEN = {
                width: 600,
                height: 800,
            };
            CONST.SCREEN_CENTER = {
                x: CONST.SCREEN.width / 2,
                y: CONST.SCREEN.height / 2,
            };
            CONST.GAME_AREA = {
                x: 0,
                y: 0,
                width: 600,
                height: 800,
            };
            CONST.GAME_AREA_RECT = {
                right: CONST.GAME_AREA.x + CONST.GAME_AREA.width,
                left: CONST.GAME_AREA.x,
                top: CONST.GAME_AREA.y,
                bottom: CONST.GAME_AREA.y + CONST.GAME_AREA.height,
            };
            CONST.GAME_AREA_CENTER = {
                x: CONST.GAME_AREA.width / 2 + CONST.GAME_AREA.x,
                y: CONST.GAME_AREA.height / 2 + CONST.GAME_AREA.y,
            };
            CONST.PLAYER = {
                SPEED: 200,
                START: {
                    x: CONST.SCREEN_CENTER.x,
                    y: {
                        from: CONST.SCREEN.height + 50,
                        to: CONST.SCREEN.height - 150,
                    },
                    duration: 1000
                },
                HIT_DIAMETER: 0.25,
                BULLET: {
                    INTERVAL: 500,
                    SPEED: -250,
                    SHOT_OFFSET: [
                        { x: 0, y: -50 }, { x: 0, y: -20 },
                        { x: 25, y: -25 }, { x: 25, y: 0 },
                        { x: -25, y: -25 }, { x: -25, y: 0 },
                    ]
                },
                DEATH_EXPLOSION_INTERVAL: 600
            };
            CONST.ENEMY = {
                START: {
                    x: CONST.SCREEN_CENTER.x,
                    y: {
                        from: -100,
                        to: 100
                    },
                    duration: 1000
                },
            };
            CONST.BG = {
                TILE_SIZE: {
                    w: 400,
                    h: 400
                },
                SPEED: 2
            };
            CONST.BULLET = {
                DEFO_ANGLE: 90
            };
            CONST.PARTICLES_COUNT = {
                EXPLOSION: 26,
                PLAYER_DEATH: 64
            };
            return CONST;
        }());
        mtsh.CONST = CONST;
    })(mtsh = mkg.mtsh || (mkg.mtsh = {}));
})(mkg || (mkg = {}));
var mkg;
(function (mkg) {
    var mtsh;
    (function (mtsh) {
        function outsideGameArea(x, y, w, h) {
            return !mkg.util.hitBox2Box(mkg.util.convRect(x, y, w, h), mkg.util.convRect(mtsh.CONST.GAME_AREA_CENTER.x, mtsh.CONST.GAME_AREA_CENTER.y, mtsh.CONST.GAME_AREA.width, mtsh.CONST.GAME_AREA.height));
        }
        mtsh.outsideGameArea = outsideGameArea;
    })(mtsh = mkg.mtsh || (mkg.mtsh = {}));
})(mkg || (mkg = {}));
var mkg;
(function (mkg) {
    var mtsh;
    (function (mtsh) {
        window.onload = function () {
            run();
        };
        function run() {
            var config = {
                type: Phaser.CANVAS,
                parent: 'phaser-canvas',
                width: mtsh.CONST.SCREEN.width,
                height: mtsh.CONST.SCREEN.height,
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
                    mtsh.PreloadScene,
                    mtsh.GameScene,
                ],
                fps: {
                    target: 60
                }
            };
            var game = new Phaser.Game(config);
            mtsh.GameManager.create(game);
        }
    })(mtsh = mkg.mtsh || (mkg.mtsh = {}));
})(mkg || (mkg = {}));
var mkg;
(function (mkg) {
    var util;
    (function (util) {
        function convRect(x, y, w, h) {
            return { x: x, y: y, w: w, h: h };
        }
        util.convRect = convRect;
        function find(arr, condition) {
            for (var i = 0; i < arr.length; ++i) {
                if (condition(arr[i])) {
                    return arr[i];
                }
            }
            return null;
        }
        util.find = find;
        function polarCoord(x, y, r, angle) {
            var dir = newVector2(r, angle);
            return {
                x: x + dir.x,
                y: y + dir.y
            };
        }
        util.polarCoord = polarCoord;
        function newVector2(r, angle) {
            return new Phaser.Math.Vector2(r * Math.cos(Phaser.Math.DegToRad(angle)), r * Math.sin(Phaser.Math.DegToRad(angle)));
        }
        util.newVector2 = newVector2;
        function subtractAngle(a, b) {
            var result = a - b;
            if (result < -180) {
                return result + 360;
            }
            else if (result > 180) {
                return result - 360;
            }
            return result;
        }
        util.subtractAngle = subtractAngle;
        function hitCirclePoint(cx, cy, r, tx, ty) {
            return (cx - tx) * (cx - tx) + (cy - ty) * (cy - ty) <= r * r;
        }
        util.hitCirclePoint = hitCirclePoint;
        function hitBoxPoint(bx, by, bw, bh, tx, ty) {
            return (bx - bw * 0.5) <= tx && tx <= (bx + bw * 0.5) && (by - bh * 0.5) <= ty && ty <= (by + bh * 0.5);
        }
        util.hitBoxPoint = hitBoxPoint;
        function hitBox2Box(a, b) {
            var dx = a.x - b.x;
            var dy = a.y - b.y;
            var sw = (a.w + b.w) * 0.5;
            var sh = (a.h + b.h) * 0.5;
            return (dx * dx <= sw * sw) && (dy * dy <= sh * sh);
        }
        util.hitBox2Box = hitBox2Box;
        function rot(angle, pos, target, limit) {
            var dir = Phaser.Math.RadToDeg(Phaser.Math.Angle.BetweenPoints(pos, target));
            var delta = util.subtractAngle(angle, dir);
            if (limit < delta) {
                delta = limit;
            }
            else if (delta < -limit) {
                delta = -limit;
            }
            return angle - delta;
        }
        util.rot = rot;
    })(util = mkg.util || (mkg.util = {}));
})(mkg || (mkg = {}));
var mkg;
(function (mkg) {
    var mtsh;
    (function (mtsh) {
        var DEFAULT_ANGLR = -Phaser.Math.TAU;
        var Annulus = (function () {
            function Annulus(scene, x, y, r, w, startAngle, endAngle, color, alpha) {
                this.x = x;
                this.y = y;
                this.r = r;
                this.w = w;
                this.color = color;
                this.alpha = alpha;
                this._graphics = new Phaser.GameObjects.Graphics(scene);
                this.drow(startAngle, endAngle);
                scene.add.existing(this._graphics);
            }
            Object.defineProperty(Annulus.prototype, "graphics", {
                get: function () { return this._graphics; },
                enumerable: false,
                configurable: true
            });
            ;
            Annulus.prototype.drow = function (startAngle, endAngle) {
                this._graphics.clear();
                this._graphics.lineStyle(this.w, this.color, this.alpha);
                this._graphics.beginPath();
                this._graphics.arc(this.x, this.y, this.r, startAngle + DEFAULT_ANGLR, endAngle + DEFAULT_ANGLR);
                this._graphics.strokePath();
                this._graphics.closePath();
            };
            Annulus.prototype.update = function (startAngle, endAngle) {
                this.drow(startAngle, endAngle);
            };
            return Annulus;
        }());
        mtsh.Annulus = Annulus;
    })(mtsh = mkg.mtsh || (mkg.mtsh = {}));
})(mkg || (mkg = {}));
var mkg;
(function (mkg) {
    var mtsh;
    (function (mtsh) {
        var WIDTH = 10;
        var COLOR = 0x612c16;
        var ALPHA = 0.6;
        var EnemyHpGauge = (function () {
            function EnemyHpGauge(scene, maxHp, r) {
                this.maxHp = maxHp;
                this.annulus = new mtsh.Annulus(scene, 0, 0, r, WIDTH, 0, Phaser.Math.PI2, COLOR, ALPHA);
            }
            Object.defineProperty(EnemyHpGauge.prototype, "graphics", {
                get: function () { return this.annulus.graphics; },
                enumerable: false,
                configurable: true
            });
            ;
            EnemyHpGauge.prototype.update = function (hp) {
                var startAngle = (1 - hp / this.maxHp) * Phaser.Math.PI2;
                var endAngle = Phaser.Math.PI2;
                this.annulus.update(startAngle, endAngle);
            };
            EnemyHpGauge.prototype.destroy = function () {
                this.annulus.graphics.destroy(true);
            };
            return EnemyHpGauge;
        }());
        mtsh.EnemyHpGauge = EnemyHpGauge;
    })(mtsh = mkg.mtsh || (mkg.mtsh = {}));
})(mkg || (mkg = {}));
var mkg;
(function (mkg) {
    var mtsh;
    (function (mtsh) {
        var BulletManager = (function () {
            function BulletManager() {
                this.bulletList = [];
            }
            BulletManager.getInstance = function () {
                if (!BulletManager.instance) {
                    BulletManager.instance = new BulletManager();
                }
                return BulletManager.instance;
            };
            BulletManager.prototype.destroyBulletAll = function () {
                this.bulletList.forEach(function (b) {
                    b.destroy(true);
                });
                this.bulletList = [];
            };
            BulletManager.prototype.createBullet = function (scene, img) {
                var _this = this;
                var bullet = new mtsh.Bullet(scene, img, function () {
                    bullet.destroy(true);
                    _this.bulletList = _this.bulletList.filter(function (b) {
                        return b != bullet;
                    });
                });
                this.bulletList.push(bullet);
                return bullet;
            };
            BulletManager.prototype.use = function (x, y, vx, vy, img, setCollider) {
                var bullet = this.createBullet(mtsh.GameManager.getInstance().gameScene, img);
                setCollider(bullet);
                bullet.use(x, y, vx, vy);
            };
            BulletManager.prototype.listSize = function () {
                return this.bulletList.length;
            };
            BulletManager.prototype.update = function () {
                this.bulletList = this.bulletList.filter(function (bullet) {
                    if (bullet.isDestroyOutside() && mtsh.outsideGameArea(bullet.x, bullet.y, bullet.width, bullet.width)) {
                        bullet.destroy(true);
                        return false;
                    }
                    bullet.update();
                    return true;
                });
            };
            return BulletManager;
        }());
        mtsh.BulletManager = BulletManager;
    })(mtsh = mkg.mtsh || (mkg.mtsh = {}));
})(mkg || (mkg = {}));
var mkg;
(function (mkg) {
    var mtsh;
    (function (mtsh) {
        var GameManager = (function () {
            function GameManager(game) {
                this._game = game;
            }
            GameManager.create = function (game) {
                if (!GameManager.instance) {
                    GameManager.instance = new GameManager(game);
                }
            };
            GameManager.getInstance = function () {
                return GameManager.instance;
            };
            Object.defineProperty(GameManager.prototype, "game", {
                get: function () {
                    return this._game;
                },
                enumerable: false,
                configurable: true
            });
            GameManager.prototype.setConfig = function (scene) {
                this._config = scene.cache.json.get(mtsh.CONST.RESOURCE_KEY.JSON.CONFIG);
                return this._config;
            };
            Object.defineProperty(GameManager.prototype, "config", {
                get: function () { return this._config; },
                enumerable: false,
                configurable: true
            });
            ;
            Object.defineProperty(GameManager.prototype, "gameScene", {
                get: function () {
                    return this._game.scene.getScene(mtsh.CONST.SCENE_KEY.GAME);
                },
                enumerable: false,
                configurable: true
            });
            return GameManager;
        }());
        mtsh.GameManager = GameManager;
    })(mtsh = mkg.mtsh || (mkg.mtsh = {}));
})(mkg || (mkg = {}));
var mkg;
(function (mkg) {
    var mtsh;
    (function (mtsh) {
        var ObjectManager = (function () {
            function ObjectManager() {
                this._playerState = mtsh.PLAYER_STATE.INIT;
            }
            Object.defineProperty(ObjectManager.prototype, "player", {
                get: function () {
                    return this._player;
                },
                enumerable: false,
                configurable: true
            });
            ObjectManager.getInstance = function () {
                if (!ObjectManager.instance) {
                    ObjectManager.instance = new ObjectManager();
                }
                return ObjectManager.instance;
            };
            ObjectManager.prototype.destroyObjects = function () {
                if (this.playerDeathTimer) {
                    this.playerDeathTimer.destroy();
                    this.playerDeathTimer = null;
                }
                this._player.destroy(true);
                this.enemy.destroy();
                mtsh.BulletManager.getInstance().destroyBulletAll();
            };
            ObjectManager.prototype.createObjects = function (scene) {
                mtsh.Bg.getInstance().create(scene, mtsh.CONST.RESOURCE_KEY.IMG.BG);
                this._player = new mtsh.Player(scene, mtsh.CONST.PLAYER.START.x, mtsh.CONST.PLAYER.START.y.from, mtsh.CONST.RESOURCE_KEY.IMG.PLAYER);
                this.createEnemy(scene);
                mtsh.ParticlesManager.getInstance().init(scene);
                this._playerState = mtsh.PLAYER_STATE.INIT;
                this.playerDeathTimer = null;
            };
            ObjectManager.prototype.update = function (scene) {
                mtsh.Bg.getInstance().update();
                mtsh.BulletManager.getInstance().update();
            };
            ObjectManager.prototype.startPhaseInit = function (scene, onComplete) {
                mtsh.GameManager.getInstance().gameScene.tweens.add({
                    targets: this._player,
                    y: mtsh.CONST.PLAYER.START.y.to,
                    duration: mtsh.CONST.PLAYER.START.duration,
                    onComplete: function () {
                        onComplete();
                    }
                });
            };
            ObjectManager.prototype.startPhase = function (scene) {
                this.update(scene);
            };
            ObjectManager.prototype.playPhaseInit = function (scene) {
                this._playerState = mtsh.PLAYER_STATE.PLAY;
                this.enemy.body.y = mtsh.CONST.ENEMY.START.y.to;
            };
            ObjectManager.prototype.playPhase = function (scene, callback) {
                this.update(scene);
                this._player.update(scene);
                this.enemy.update(scene);
                if (this.isGameEnd()) {
                    callback();
                }
            };
            ObjectManager.prototype.endPhaseInit = function (scene) {
                var label = scene.add.image(mtsh.CONST.SCREEN_CENTER.x, mtsh.CONST.SCREEN_CENTER.y, this.isWin() ? mtsh.CONST.RESOURCE_KEY.IMG.WIN : mtsh.CONST.RESOURCE_KEY.IMG.LOSE);
                label.setOrigin(0.5, 0.5);
            };
            ObjectManager.prototype.endPhase = function (scene) {
                this.update(scene);
            };
            ObjectManager.prototype.createEnemy = function (scene) {
                var _this = this;
                var enemy = new mtsh.Enemy(scene, mtsh.CONST.ENEMY.START.x, mtsh.CONST.ENEMY.START.y.from, mtsh.CONST.RESOURCE_KEY.IMG.ENEMY, 100);
                scene.physics.add.overlap(this._player, enemy.image, function (p) {
                    _this.colliderPlayerToEnemy(p);
                }, undefined, scene);
                this.enemy = enemy;
            };
            ObjectManager.prototype.setCollderBullet = function (bullet) {
                var _this = this;
                var scene = mtsh.GameManager.getInstance().gameScene;
                scene.physics.add.overlap(bullet, this.player, function (b, p) {
                    b.hit();
                    _this.hitPlayer(p);
                }, undefined, scene);
            };
            ObjectManager.prototype.setCollderPlayerBullet = function (bullet) {
                var _this = this;
                var scene = mtsh.GameManager.getInstance().gameScene;
                scene.physics.add.overlap(bullet, this.enemy.image, function (b, e) {
                    if (!_this.enemy.isDeath()) {
                        mtsh.ParticlesManager.getInstance().explosion(mtsh.CONST.PARTICLES_COUNT.EXPLOSION, bullet.x, bullet.y);
                        bullet.hit();
                        _this.enemy.hit();
                        if (_this.enemy.isDeath()) {
                            _this._playerState = mtsh.PLAYER_STATE.WIN;
                        }
                    }
                }, undefined, scene);
            };
            ObjectManager.prototype.colliderPlayerToEnemy = function (p) {
                this.hitPlayer(p);
            };
            ObjectManager.prototype.hitPlayer = function (p) {
                if (this._playerState === mtsh.PLAYER_STATE.PLAY) {
                    var scene = mtsh.GameManager.getInstance().gameScene;
                    var create_1 = function () {
                        var offset = 80;
                        var x = p.x + (Math.random() - 0.5) * offset;
                        var y = p.y + (Math.random() - 0.5) * offset;
                        mtsh.ParticlesManager.getInstance().playerDeath(mtsh.CONST.PARTICLES_COUNT.PLAYER_DEATH, x, y);
                    };
                    create_1();
                    this.playerDeathTimer = scene.time.addEvent({
                        loop: true,
                        delay: mtsh.CONST.PLAYER.DEATH_EXPLOSION_INTERVAL,
                        callback: function () {
                            create_1();
                        }
                    });
                    this._playerState = mtsh.PLAYER_STATE.DEATH;
                }
            };
            ObjectManager.prototype.isGameEnd = function () {
                return this._playerState === mtsh.PLAYER_STATE.WIN || this._playerState === mtsh.PLAYER_STATE.DEATH;
            };
            ObjectManager.prototype.isWin = function () {
                return this._playerState === mtsh.PLAYER_STATE.WIN;
            };
            return ObjectManager;
        }());
        mtsh.ObjectManager = ObjectManager;
    })(mtsh = mkg.mtsh || (mkg.mtsh = {}));
})(mkg || (mkg = {}));
var mkg;
(function (mkg) {
    var mtsh;
    (function (mtsh) {
        var ParticlesManager = (function () {
            function ParticlesManager() {
            }
            ParticlesManager.getInstance = function () {
                if (!ParticlesManager.instance) {
                    ParticlesManager.instance = new ParticlesManager();
                }
                return ParticlesManager.instance;
            };
            ParticlesManager.prototype.init = function (scene) {
                this.explosionEmitter = scene.add.particles(mtsh.CONST.RESOURCE_KEY.IMG.SMOKE).createEmitter({
                    x: 0,
                    y: 0,
                    speed: { min: 20, max: 100 },
                    angle: { min: 0, max: 360 },
                    scale: { start: 1, end: 0 },
                    alpha: { start: 0, end: 0.1 },
                    lifespan: 1000,
                    quantity: 0,
                    frequency: 500,
                });
                this.playerDeathEmitter = scene.add.particles(mtsh.CONST.RESOURCE_KEY.IMG.SMOKE).createEmitter({
                    x: 0,
                    y: 0,
                    speed: { min: 20, max: 150 },
                    angle: { min: 0, max: 360 },
                    scale: { start: 1, end: 0 },
                    alpha: { start: 0, end: 0.1 },
                    lifespan: 1000,
                    quantity: 0,
                    frequency: 500,
                });
            };
            ParticlesManager.prototype.destroy = function () {
                this.explosionEmitter.remove();
                this.playerDeathEmitter.remove();
            };
            ParticlesManager.prototype.explosion = function (count, x, y) {
                this.explosionEmitter.explode(count, x, y);
            };
            ParticlesManager.prototype.playerDeath = function (count, x, y) {
                this.playerDeathEmitter.explode(count, x, y);
            };
            return ParticlesManager;
        }());
        mtsh.ParticlesManager = ParticlesManager;
    })(mtsh = mkg.mtsh || (mkg.mtsh = {}));
})(mkg || (mkg = {}));
var mkg;
(function (mkg) {
    var mtsh;
    (function (mtsh) {
        var Bg = (function () {
            function Bg() {
                this.bgList = [];
            }
            Bg.getInstance = function () {
                if (!Bg.instance) {
                    Bg.instance = new Bg();
                }
                return Bg.instance;
            };
            Bg.prototype.create = function (scene, img) {
                var col = Math.ceil(mtsh.CONST.GAME_AREA.width / mtsh.CONST.BG.TILE_SIZE.w);
                var row = Math.ceil(mtsh.CONST.GAME_AREA.height / mtsh.CONST.BG.TILE_SIZE.h);
                for (var y = -1; y < row; ++y) {
                    for (var x = 0; x < col; ++x) {
                        var image = scene.add.image(mtsh.CONST.GAME_AREA.x + x * mtsh.CONST.BG.TILE_SIZE.w, mtsh.CONST.GAME_AREA.y + y * mtsh.CONST.BG.TILE_SIZE.h, img);
                        image.setOrigin(0, 0);
                        this.bgList.push(image);
                    }
                }
            };
            Bg.prototype.update = function () {
                this.bgList.forEach(function (bg) {
                    bg.y += mtsh.CONST.BG.SPEED;
                    if (bg.y > mtsh.CONST.GAME_AREA.height) {
                        bg.y -= mtsh.CONST.GAME_AREA.height + mtsh.CONST.BG.TILE_SIZE.h;
                    }
                });
            };
            return Bg;
        }());
        mtsh.Bg = Bg;
    })(mtsh = mkg.mtsh || (mkg.mtsh = {}));
})(mkg || (mkg = {}));
var mkg;
(function (mkg) {
    var mtsh;
    (function (mtsh) {
        var Bullet = (function (_super) {
            __extends(Bullet, _super);
            function Bullet(scene, texture, hitCallback, frame) {
                var _this = _super.call(this, scene, 0, 0, texture, frame) || this;
                scene.add.existing(_this);
                scene.physics.add.existing(_this);
                _this.hitCallback = hitCallback;
                _this.setOrigin(0.5);
                _this.setCircle(_this.width * 0.5);
                _this.setActive(false);
                _this.setVisible(false);
                return _this;
            }
            Bullet.prototype.use = function (x, y, vx, vy) {
                this.setActive(true);
                this.setVisible(true);
                this.setPosition(x, y);
                this.setVelocity(vx, vy);
                this.velo = new Phaser.Math.Vector2(vx, vy);
            };
            Bullet.prototype.update = function () {
                this.angle = Phaser.Math.RadToDeg(this.velo.angle()) + mtsh.CONST.BULLET.DEFO_ANGLE;
            };
            Bullet.prototype.isDestroyOutside = function () {
                return true;
            };
            Bullet.prototype.hit = function () {
                this.hitCallback();
            };
            return Bullet;
        }(Phaser.Physics.Arcade.Image));
        mtsh.Bullet = Bullet;
    })(mtsh = mkg.mtsh || (mkg.mtsh = {}));
})(mkg || (mkg = {}));
var mkg;
(function (mkg) {
    var mtsh;
    (function (mtsh) {
        var Enemy = (function () {
            function Enemy(scene, x, y, texture, hp) {
                this._image = new Phaser.Physics.Arcade.Image(scene, 0, 0, texture);
                scene.add.existing(this._image);
                scene.physics.add.existing(this._image);
                this._image.setOrigin(0.5);
                this._image.setCircle(this._image.width * 0.5);
                this.hp = hp;
                this.hpGauge = new mtsh.EnemyHpGauge(scene, this.hp, this._image.width / 2 + 10);
                this.container = scene.add.container(x, y, [this._image, this.hpGauge.graphics]);
                scene.physics.add.existing(this.container);
            }
            Object.defineProperty(Enemy.prototype, "body", {
                get: function () { return this.container.body; },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(Enemy.prototype, "image", {
                get: function () { return this._image; },
                enumerable: false,
                configurable: true
            });
            Enemy.prototype.update = function (scene) {
            };
            Enemy.prototype.hit = function () {
                if (this.hp > 0) {
                    --this.hp;
                    this.hpGauge.update(this.hp);
                    if (this.isDeath()) {
                        this.image.setVisible(false);
                    }
                }
            };
            Enemy.prototype.isDeath = function () {
                return this.hp <= 0;
            };
            Enemy.prototype.destroy = function () {
                this._image.destroy(true);
                this.hpGauge.destroy();
                this.container.destroy(true);
            };
            return Enemy;
        }());
        mtsh.Enemy = Enemy;
    })(mtsh = mkg.mtsh || (mkg.mtsh = {}));
})(mkg || (mkg = {}));
var mkg;
(function (mkg) {
    var mtsh;
    (function (mtsh) {
        var Player = (function (_super) {
            __extends(Player, _super);
            function Player(scene, x, y, texture, frame) {
                var _this = _super.call(this, scene, x, y, texture, frame) || this;
                scene.add.existing(_this);
                scene.physics.add.existing(_this);
                _this.setOrigin(0.5);
                var offset = _this.width * (0.5 - mtsh.CONST.PLAYER.HIT_DIAMETER);
                _this.setCircle(_this.width * mtsh.CONST.PLAYER.HIT_DIAMETER, offset, offset);
                _this.startShot(scene);
                return _this;
            }
            Player.prototype.update = function (scene) {
                var cursors = scene.input.keyboard.createCursorKeys();
                var isPress = false;
                var targetVec = { x: 0, y: 0 };
                if (cursors.left && cursors.left.isDown) {
                    isPress = true;
                    targetVec.x = -1;
                }
                else if (cursors.right && cursors.right.isDown) {
                    isPress = true;
                    targetVec.x = 1;
                }
                if (cursors.up && cursors.up.isDown) {
                    isPress = true;
                    targetVec.y = -1;
                }
                else if (cursors.down && cursors.down.isDown) {
                    isPress = true;
                    targetVec.y = 1;
                }
                if (!isPress) {
                    this.setVelocity(0, 0);
                    return;
                }
                var angle = Phaser.Math.RadToDeg(Math.atan2(targetVec.y, targetVec.x));
                this.updateVelo(angle);
            };
            Player.prototype.updateVelo = function (angle) {
                var velo = mkg.util.polarCoord(0, 0, mtsh.CONST.PLAYER.SPEED, angle);
                this.setVelocity(velo.x, velo.y);
                this.outside();
            };
            Player.prototype.outside = function () {
                if (this.x < mtsh.CONST.GAME_AREA_RECT.left) {
                    this.x = mtsh.CONST.GAME_AREA_RECT.left;
                }
                else if (this.x > mtsh.CONST.GAME_AREA_RECT.right) {
                    this.x = mtsh.CONST.GAME_AREA_RECT.right;
                }
                if (this.y < mtsh.CONST.GAME_AREA_RECT.top) {
                    this.y = mtsh.CONST.GAME_AREA_RECT.top;
                }
                else if (this.y > mtsh.CONST.GAME_AREA_RECT.bottom) {
                    this.y = mtsh.CONST.GAME_AREA_RECT.bottom;
                }
            };
            Player.prototype.startShot = function (scene) {
                var _this = this;
                this.shotTimer = scene.time.addEvent({
                    loop: true,
                    delay: mtsh.CONST.PLAYER.BULLET.INTERVAL,
                    callback: function () {
                        _this.shot();
                    }
                });
            };
            Player.prototype.stopShot = function () {
                if (this.shotTimer) {
                    this.shotTimer.destroy();
                }
            };
            Player.prototype.shot = function () {
                var _this = this;
                mtsh.CONST.PLAYER.BULLET.SHOT_OFFSET.forEach(function (pos) {
                    mtsh.BulletManager.getInstance().use(_this.x + pos.x, _this.y + pos.y, 0, mtsh.CONST.PLAYER.BULLET.SPEED, mtsh.CONST.RESOURCE_KEY.IMG.BULET000, function (b) {
                        mtsh.ObjectManager.getInstance().setCollderPlayerBullet(b);
                    });
                });
            };
            return Player;
        }(Phaser.Physics.Arcade.Image));
        mtsh.Player = Player;
    })(mtsh = mkg.mtsh || (mkg.mtsh = {}));
})(mkg || (mkg = {}));
var mkg;
(function (mkg) {
    var mtsh;
    (function (mtsh) {
        var GameScene = (function (_super) {
            __extends(GameScene, _super);
            function GameScene() {
                var _this = _super.call(this, mtsh.CONST.SCENE_KEY.GAME) || this;
                _this.majorState = mtsh.GAME_STATE.INIT;
                _this.minorState = mtsh.MINOR_STATE.INIT;
                return _this;
            }
            GameScene.prototype.preload = function () {
                this.load.image(mtsh.CONST.RESOURCE_KEY.IMG.PLAYER, "assets/img/character_takenoko.png");
                this.load.image(mtsh.CONST.RESOURCE_KEY.IMG.ENEMY, "assets/img/character_kinoko.png");
                this.load.image(mtsh.CONST.RESOURCE_KEY.IMG.BULET000, "assets/img/takenoko_bamboo_shoot.png");
                this.load.image(mtsh.CONST.RESOURCE_KEY.IMG.BULET001, "assets/img/kinoko.png");
                this.load.image(mtsh.CONST.RESOURCE_KEY.IMG.BG, "assets/img/pattern_shibafu.png");
                this.load.image(mtsh.CONST.RESOURCE_KEY.IMG.SMOKE, "assets/img/bakuhatsu1.png");
                this.load.image(mtsh.CONST.RESOURCE_KEY.IMG.FILTER, "assets/img/filter.png");
                this.load.image(mtsh.CONST.RESOURCE_KEY.IMG.WIN, "assets/img/text_win.png");
                this.load.image(mtsh.CONST.RESOURCE_KEY.IMG.LOSE, "assets/img/text_lose.png");
                this.load.image(mtsh.CONST.RESOURCE_KEY.IMG.TAP, "assets/img/text_tap.png");
            };
            GameScene.prototype.create = function () {
                mtsh.ObjectManager.getInstance().createObjects(this);
                this.debugText = this.add.text(10, 10, "", { color: '#333300' });
                this.setState(mtsh.GAME_STATE.START);
                this.setupKey();
            };
            GameScene.prototype.setupKey = function () {
                var _this = this;
                var keyObj = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
                keyObj.on("up", function () {
                    if (!!_this.nextKeyCallback) {
                        _this.nextKeyCallback();
                    }
                });
            };
            GameScene.prototype.update = function () {
                var _this = this;
                this.debugText.setText([
                    "FPS : " + mtsh.GameManager.getInstance().game.loop.actualFps,
                    "Bullet size : " + mtsh.BulletManager.getInstance().listSize()
                ]);
                switch (this.majorState) {
                    case mtsh.GAME_STATE.START:
                        this.checkStateInit(function () {
                            mtsh.ObjectManager.getInstance().startPhaseInit(_this, function () {
                                _this.setState(mtsh.GAME_STATE.PLAY);
                            });
                        });
                        mtsh.ObjectManager.getInstance().startPhase(this);
                        break;
                    case mtsh.GAME_STATE.PLAY:
                        this.checkStateInit(function () {
                            mtsh.ObjectManager.getInstance().playPhaseInit(_this);
                        });
                        mtsh.ObjectManager.getInstance().playPhase(this, function () {
                            _this.setState(mtsh.GAME_STATE.END);
                        });
                        break;
                    case mtsh.GAME_STATE.END:
                        this.checkStateInit(function () {
                            mtsh.ObjectManager.getInstance().endPhaseInit(_this);
                        });
                        mtsh.ObjectManager.getInstance().endPhase(this);
                        break;
                }
            };
            GameScene.prototype.setState = function (state) {
                console.log("=====setState: " + state);
                this.majorState = state;
                this.minorState = mtsh.MINOR_STATE.INIT;
            };
            GameScene.prototype.checkStateInit = function (callback) {
                if (this.minorState === mtsh.MINOR_STATE.INIT) {
                    this.minorState = mtsh.MINOR_STATE.WAIT;
                    callback();
                }
            };
            return GameScene;
        }(Phaser.Scene));
        mtsh.GameScene = GameScene;
    })(mtsh = mkg.mtsh || (mkg.mtsh = {}));
})(mkg || (mkg = {}));
var mkg;
(function (mkg) {
    var mtsh;
    (function (mtsh) {
        var PreloadScene = (function (_super) {
            __extends(PreloadScene, _super);
            function PreloadScene() {
                return _super.call(this, mtsh.CONST.SCENE_KEY.PRELOAD) || this;
            }
            PreloadScene.prototype.preload = function () {
                this.load.json(mtsh.CONST.RESOURCE_KEY.JSON.CONFIG, "assets/json/config.json");
            };
            PreloadScene.prototype.create = function () {
                mtsh.GameManager.getInstance().setConfig(this);
                console.log("game version : " + mtsh.GameManager.getInstance().config.version);
            };
            PreloadScene.prototype.update = function () {
                this.scene.start(mtsh.CONST.SCENE_KEY.GAME);
            };
            return PreloadScene;
        }(Phaser.Scene));
        mtsh.PreloadScene = PreloadScene;
    })(mtsh = mkg.mtsh || (mkg.mtsh = {}));
})(mkg || (mkg = {}));
