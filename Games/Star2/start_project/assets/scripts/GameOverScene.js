


cc.Class({
    extends: cc.Component,

    properties: {
        shootingStar: {
            default: null,
            type: cc.Node,
        },
        starDuration: 0,
        starBeginX: 0,
        starBeginY: 0,
        starEndX: 0,
        starEndY: 0,
        playButton: {
            default: null,
            type: cc.Button,
        },
    },

    onLoad: function () {
        this.physicsManager = cc.director.getPhysicsManager();
        this.physicsManager.enabled = true;

        this.shootingStar.width *= 0.5;
        this.shootingStar.height *= 0.5;

        this.shootingStar.runAction(this.setShootingStarAction());
    },

    update: function (dt) {

    },

    setShootingStarAction: function () {
        var restore = cc.callFunc(function () {
            this.shootingStar.width *= 0.5;
            this.shootingStar.height *= 0.5;
            this.shootingStar.opacity = 128;
            this.shootingStar.setPosition(cc.v2(this.starBeginX, this.starBeginY));
        }, this);
        var across = cc.bezierBy(this.starDuration,[
                cc.v2(0,0),
                cc.v2(0.5*(this.starEndX-this.starBeginX),0),
                cc.v2(this.starEndX-this.starBeginX,this.starEndY-this.starBeginY),
        ]).easing(cc.easeCubicActionIn());
        var zoomIn = cc.scaleBy(this.starDuration, 2);
        var appear = cc.fadeTo(this.starDuration, 255);
        return cc.repeatForever(cc.sequence(restore, cc.spawn(across, zoomIn, appear)));
    },

    onPlayButtonClick: function (event, customEventData) {
        // 这里 event 是一个 Event 对象，你可以通过 event.target 取到事件的发送节点
        //var node = event.target;
        //var button = node.getComponent(cc.Button);
        cc.director.loadScene('game scene');
    }
});
