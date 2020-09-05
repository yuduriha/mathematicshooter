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
    var bihw;
    (function (bihw) {
        var CONST = (function () {
            function CONST() {
            }
            CONST.SCREEN = {
                width: 1136,
                height: 640,
            };
            CONST.SCENE_KEY = {
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
        bihw.CONST = CONST;
    })(bihw = mkg.bihw || (mkg.bihw = {}));
})(mkg || (mkg = {}));
var mkg;
(function (mkg) {
    var bihw;
    (function (bihw) {
        window.onload = function () {
            run();
        };
        function run() {
            var config = {
                type: Phaser.CANVAS,
                parent: 'phaser-canvas',
                width: bihw.CONST.SCREEN.width,
                height: bihw.CONST.SCREEN.height,
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
                    bihw.GameScene,
                ],
                fps: {
                    target: 30
                }
            };
            var game = new Phaser.Game(config);
        }
    })(bihw = mkg.bihw || (mkg.bihw = {}));
})(mkg || (mkg = {}));
var mkg;
(function (mkg) {
    var bihw;
    (function (bihw) {
        var GameScene = (function (_super) {
            __extends(GameScene, _super);
            function GameScene() {
                return _super.call(this, bihw.CONST.SCENE_KEY.GAME) || this;
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
        bihw.GameScene = GameScene;
    })(bihw = mkg.bihw || (mkg.bihw = {}));
})(mkg || (mkg = {}));
