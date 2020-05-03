(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Star.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '69ed2JdACRDbLKxxG7E2bZJ', 'Star', __filename);
// scripts/Star.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        maxStarDuration: 5, // 星星产生后消失时间的随机范围
        minStarDuration: 3,
        minOpacity: 50, //星星的透明度最小值
        targetDisappearX: 0,
        targetDisappearY: 240
    },

    onLoad: function onLoad() {
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },

    start: function start() {},

    update: function update(dt) {
        // 根据 Game 脚本中的计时器更新星星的透明度
        this.timer += dt;
        var opacityRatio = 1 - this.timer / this.starDuration;
        this.node.opacity = this.minOpacity + Math.floor(opacityRatio * (255 - this.minOpacity));
    },

    setPickedAction: function setPickedAction() {
        // 时间间隔
        var animationDuration = 0.002 * Math.ceil(Math.hypot(this.node.x - this.targetDisappearX, this.node.y - this.targetDisappearY));
        // 旋转
        var rotate;
        if (this.node.x < this.targetDisappearX) {
            if (this.node.opacity < 150) {
                rotate = cc.rotateBy(animationDuration, 144.0);
            } else {
                rotate = cc.rotateBy(animationDuration, 432.0);
            }
        } else {
            if (this.node.opacity < 150) {
                rotate = cc.rotateBy(animationDuration, -144.0);
            } else {
                rotate = cc.rotateBy(animationDuration, -432.0);
            }
        }
        // 飞远
        var flyAway = cc.bezierBy(animationDuration, [cc.v2(0, 0), cc.v2(0.5 * (this.targetDisappearX - this.node.x), this.targetDisappearY), cc.v2(this.targetDisappearX - this.node.x, this.targetDisappearY - this.node.y)]).easing(cc.easeCubicActionIn());
        // 缩小
        var zoomOut = cc.scaleTo(animationDuration, 0.5);
        // 消失
        var disappear = cc.fadeTo(animationDuration, 128);

        return cc.spawn(rotate, flyAway, zoomOut, disappear);
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
        //# sourceMappingURL=Star.js.map
        