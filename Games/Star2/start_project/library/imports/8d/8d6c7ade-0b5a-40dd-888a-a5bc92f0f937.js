"use strict";
cc._RF.push(module, '8d6c7reC1pA3YiKpbyS8Pk3', 'MenuScene');
// scripts/MenuScene.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        playButton: {
            default: null,
            type: cc.Button
        }
    },

    onLoad: function onLoad() {
        this.physicsManager = cc.director.getPhysicsManager();
        this.physicsManager.enabled = true;
    },

    start: function start() {},

    update: function update(dt) {},

    onPlayButtonClick: function onPlayButtonClick(event, customEventData) {
        cc.director.loadScene("game scene");
    }
});

cc._RF.pop();