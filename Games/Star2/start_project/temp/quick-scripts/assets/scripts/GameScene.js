(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/GameScene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b90aapzYnFCsa2hDdFrHCL+', 'GameScene', __filename);
// scripts/GameScene.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        pickRadius: 0, // 星星和主角之间的距离小于这个数值时，就会完成收集
        ground: { // 地面节点，用于确定星星生成的高度
            default: null,
            type: cc.Node
        },
        player: { // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
            default: null,
            type: cc.Node
        },
        starPrefab: { // 这个属性引用了星星预制资源
            default: null,
            type: cc.Prefab
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        scoreAudio: { // 得分音效资源
            default: null,
            type: cc.AudioClip
        }
    },

    onLoad: function onLoad() {
        // 获取地平面的 y 轴坐标
        this.groundY = this.ground.y + this.ground.height / 2;
        // 初始化计时器
        this.score = 0;
        this.isPicked = false;
        // 生成一个新的星星
        this.spawnNewStar();
    },

    start: function start() {},

    update: function update(dt) {
        if (!this.isPicked) {
            // 还没有摘到星星
            if (this.star.getComponent('Star').timer > this.star.getComponent('Star').starDuration) {
                //超过时限
                this.gameOver(); // 调用游戏结束
            } else if (this.getPlayerDistance() < this.pickRadius) {
                //判断星星和主角之间的距离是否小于收集距离
                this.starPicked(); //调用收集行为
            }
        }
    },

    spawnNewStar: function spawnNewStar() {
        // 使用给定的模板在场景中生成一个新节点
        this.star = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(this.star);
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        var randX = (Math.random() - 0.5) * this.node.width;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        this.star.setPosition(cc.v2(randX, randY));

        this.isPicked = false;
    },

    gameOver: function gameOver() {
        //this.player.stopAllActions(); //停止 player 节点的跳跃动作
        cc.director.loadScene('game over scene');
    },

    getPlayerDistance: function getPlayerDistance() {
        // 得到 player 节点位置
        var playerPos = this.player.getPosition();
        // 根据player和star两节点位置计算两点之间距离
        var dist = this.star.position.sub(playerPos).mag();
        return dist;
    },

    starPicked: function starPicked() {
        // 调用 Game 脚本的得分方法
        this.gainScore();
        // 动画
        var pickedAction = this.star.getComponent('Star').setPickedAction();
        // 然后销毁当前星星节点
        var destroyStar = cc.callFunc(function () {
            this.star.destroy();
        }, this);
        // 生成一个新的星星
        var spawnStar = cc.callFunc(function () {
            this.spawnNewStar();
        }, this);
        this.star.runAction(cc.sequence(pickedAction, destroyStar, spawnStar));
    },

    gainScore: function gainScore() {
        this.score += 1;
        this.isPicked = true;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GameScene.js.map
        