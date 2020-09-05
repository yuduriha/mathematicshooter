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
        var CONST = (function () {
            function CONST() {
            }
            CONST.SCREEN = {
                width: 1136,
                height: 640,
            };
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
                }
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
                        debug: false
                    }
                },
                scene: [
                    mtsh.PreloadScene,
                    mtsh.GameScene,
                ],
                fps: {
                    target: 30
                }
            };
            var game = new Phaser.Game(config);
            mtsh.GameManager.create(game);
        }
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
        var GameScene = (function (_super) {
            __extends(GameScene, _super);
            function GameScene() {
                return _super.call(this, mtsh.CONST.SCENE_KEY.GAME) || this;
            }
            GameScene.prototype.preload = function () {
            };
            GameScene.prototype.create = function () {
            };
            GameScene.prototype.update = function () {
                console.log("=============");
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
                console.log("bih version : " + mtsh.GameManager.getInstance().config.version);
            };
            PreloadScene.prototype.update = function () {
                this.scene.start(mtsh.CONST.SCENE_KEY.GAME);
            };
            return PreloadScene;
        }(Phaser.Scene));
        mtsh.PreloadScene = PreloadScene;
    })(mtsh = mkg.mtsh || (mkg.mtsh = {}));
})(mkg || (mkg = {}));
