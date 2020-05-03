(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/MenuScene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8d6c7reC1pA3YiKpbyS8Pk3', 'MenuScene', __filename);
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
        //# sourceMappingURL=MenuScene.js.map
        