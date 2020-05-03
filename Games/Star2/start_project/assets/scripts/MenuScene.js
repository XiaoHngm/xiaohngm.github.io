


cc.Class({
    extends: cc.Component,

    properties: {
        playButton: {
            default: null,
            type: cc.Button,
        },
    },

    onLoad: function () {
        this.physicsManager = cc.director.getPhysicsManager();
        this.physicsManager.enabled = true;
    },

    start: function () {

    },

    update: function (dt) {

    },

    onPlayButtonClick: function (event, customEventData) {
        cc.director.loadScene("game scene");
    },
});
