(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9080bPqd+lE8qKw5GqsoyEH', 'Player', __filename);
// scripts/Player.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        jumpHeight: 0, // 主角跳跃高度
        jumpDuration: 0, // 主角跳跃持续时间
        deformationDuration: 0, // 辅助形变动作时间
        maxMoveSpeed: 0, // 最大移动速度
        accel: 0, // 加速度
        jumpAudio: { // 跳跃音效资源
            default: null,
            type: cc.AudioClip
        }
    },

    onLoad: function onLoad() {
        this.initWidth = this.node.width;
        // 初始化跳跃动作
        this.node.runAction(this.setJumpAction());
        // 加速度方向开关
        this.accLeft = false;
        this.accRight = false;
        // 主角当前水平方向速度
        this.xSpeed = 0;
        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDownFunc, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUpFunc, this);
    },

    start: function start() {},

    update: function update(dt) {
        // 根据当前加速度方向每帧更新速度
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        } else ;
        // 限制主角的速度不能超过最大值
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        } else ;
        // 根据当前速度更新主角的位置
        this.node.x += this.xSpeed * dt;
        // 横向压扁后逐渐还原效果
        if (this.node.width < this.initWidth) {
            this.node.width = Math.min(this.node.width + 1, this.initWidth);
        }
        // 碰壁横向压扁效果
        var xRightBound = this.node.parent.width / 2 - this.initWidth / 2;
        var xLeftBound = -1 * xRightBound;
        if (this.node.x > xRightBound) {
            this.node.x = xRightBound;
            this.node.width *= 1 - 0.2 * Math.abs(this.xSpeed / this.maxMoveSpeed);
            this.xSpeed *= -0.8;
        } else if (this.node.x < xLeftBound) {
            this.node.x = xLeftBound;
            this.node.width *= 1 - 0.2 * Math.abs(this.xSpeed / this.maxMoveSpeed);
            this.xSpeed *= -0.8;
        } else ;
    },

    onDestroy: function onDestroy() {
        // 取消键盘输入监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDownFunc, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUpFunc, this);
    },

    setJumpAction: function setJumpAction() {
        //压扁
        var squash = cc.scaleTo(this.deformationDuration, 1, 0.6);
        //拉伸
        var stretch = cc.scaleTo(this.deformationDuration, 1, 1.1);
        // 跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // 下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        // 缓慢还原
        var scaleBack = cc.scaleTo(this.jumpDuration, 1, 1);
        // 添加一个回调函数，用于在动作结束时调用我们定义的其他方法
        var playJumpSound = cc.callFunc(function () {
            // 调用声音引擎播放声音
            cc.audioEngine.playEffect(this.jumpAudio, false);
        }, this);
        // 不断重复，而且每次完成落地动作后调用回调来播放声音
        return cc.repeatForever(cc.sequence(squash, stretch, cc.spawn(jumpUp, scaleBack), jumpDown, playJumpSound));
    },

    onKeyDownFunc: function onKeyDownFunc(event) {
        // set a flag when key pressed
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.accLeft = true;
                break;
            case cc.macro.KEY.right:
                this.accRight = true;
                break;
        }
    },

    onKeyUpFunc: function onKeyUpFunc(event) {
        // unset a flag when key released
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.accLeft = false;
                break;
            case cc.macro.KEY.right:
                this.accRight = false;
                break;
        }
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
        //# sourceMappingURL=Player.js.map
        