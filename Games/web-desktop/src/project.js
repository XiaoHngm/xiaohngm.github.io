
window.__require = function t(e,i,n) {
    function c(o,a){
        if(!i[o]){
            if(!e[o]){
                var r=o.split("/");
                if(r=r[r.length-1],!e[r]){
                    var u="function"==typeof __require&&__require;

                    if(!a&&u)return u(r,!0);

                    if(s)return s(r,!0);

                    throw new Error("Cannot find module '"+o+"'")
                }
            }
            var h=i[o]={exports:{}};
            e[o][0].call(h.exports,function(t){return c(e[o][1][t]||t)},h,h.exports,t,e,i,n)
        }
        return i[o].exports
    }
    for(var s="function"==typeof __require&&__require,o=0;o<n.length;o++)
        c(n[o]);
    return c
}(





{
    Game:[
        function(t,e,i){
            "use strict";
            cc._RF.push(e,"b90aapzYnFCsa2hDdFrHCL+","Game"),
            cc.Class({
                extends:cc.Component,
                properties:{
                    starPrefab:{default:null,type:cc.Prefab},
                    maxStarDuration:0,
                    minStarDuration:0,
                    ground:{default:null,type:cc.Node},
                    player:{default:null,type:cc.Node},
                    scoreDisplay:{default:null,type:cc.Label},
                    scoreAudio:{default:null,type:cc.AudioClip},
                },
                onLoad:function(){
                    this.groundY=this.ground.y+this.ground.height/2,
                    this.timer=0,
                    this.starDuration=0,
                    this.spawnNewStar(),
                    this.score=0
                },
                start:function(){
                },
                update:function(t){
                    this.timer>this.starDuration ? this.gameOver() : this.timer+=t
                },
                gainScore:function(){
                    this.score+=1,
                    this.scoreDisplay.string="Score: "+this.score.toString(),
                    cc.audioEngine.playEffect(this.scoreAudio,!1)
                },
                gameOver:function(){
                    this.player.stopAllActions(),
                    cc.director.loadScene("game")
                },
                spawnNewStar:function(){
                    var t=cc.instantiate(this.starPrefab);
                    this.node.addChild(t),
                    t.setPosition(this.getNewStarPosition()),
                    t.getComponent("Star").game=this,
                    this.starDuration=this.minStarDuration+Math.random()*(this.maxStarDuration-this.minStarDuration),
                    this.timer=0
                },
                getNewStarPosition:function(){
                    var t,
                        e=this.groundY+Math.random()*this.player.getComponent("Player").jumpHeight+50,
                        i=this.node.width/2;
                    return t=2*(Math.random()-.5)*i,cc.v2(t,e)
                }
            }),
            cc._RF.pop()
        },
        {}
    ],

    Player:[
        function(t,e,i){
            "use strict";
            cc._RF.push(e,"9080bPqd+lE8qKw5GqsoyEH","Player"),
            cc.Class({
                extends:cc.Component,
                properties:{
                    jumpHeight:0,
                    jumpDuration:0,
                    maxMoveSpeed:0,
                    accel:0,
                    jumpAudio:{default:null,type:cc.AudioClip}
                },
                onLoad:function(){
                    this.node.runAction(this.setJumpAction()),
                    this.accLeft=!1,
                    this.accRight=!1,
                    this.xSpeed=0,
                    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDownFunc,this),
                    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUpFunc,this)
                },
                start:function(){
                },
                update:function(t){
                    this.accLeft ? this.xSpeed-=this.accel*t : this.accRight&&(this.xSpeed+=this.accel*t),
                    Math.abs(this.xSpeed)>this.maxMoveSpeed&&(this.xSpeed=this.maxMoveSpeed*this.xSpeed/Math.abs(this.xSpeed)),
                    this.node.x+=this.xSpeed*t
                },
                onDestroy:function(){
                    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDownFunc,this),
                    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUpFunc,this)
                },
                setJumpAction:function(){
                    var t=cc.moveBy(this.jumpDuration,cc.v2(0,this.jumpHeight)).easing(cc.easeCubicActionOut()),e=cc.moveBy(this.jumpDuration,cc.v2(0,-this.jumpHeight)).easing(cc.easeCubicActionIn()),
                    i=cc.callFunc(this.playJumpSoundFunc,this);
                    return cc.repeatForever(cc.sequence(t,e,i))
                },
                playJumpSoundFunc:function(){
                    cc.audioEngine.playEffect(this.jumpAudio,!1)
                },
                onKeyDownFunc:function(t){
                    switch(t.keyCode){
                        case cc.macro.KEY.a:
                            this.accLeft=!0;
                            break;
                        case cc.macro.KEY.d:
                            this.accRight=!0
                    }
                },
                onKeyUpFunc:function(t){
                    switch(t.keyCode){
                        case cc.macro.KEY.a:
                            this.accLeft=!1;
                            break;
                        case cc.macro.KEY.d:
                            this.accRight=!1
                    }
                }
            }),
            cc._RF.pop()
        },
        {}
    ],


    Star:[
        function(t,e,i){
            "use strict";
            cc._RF.push(e,"69ed2JdACRDbLKxxG7E2bZJ","Star"),
            cc.Class({
                extends:cc.Component,
                properties:{pickRadius:0},
                onLoad:function(){
                },
                start:function(){
                },
                update:function(t){
                    if(this.getPlayerDistance()<this.pickRadius)
                        this.onPicked();
                    else{
                        var e=1-this.game.timer/this.game.starDuration;
                        this.node.opacity=50+Math.floor(205*e)
                    }
                },
                getPlayerDistance:function(){
                    var t=this.game.player.getPosition();
                    return this.node.position.sub(t).mag()
                },
                onPicked:function(){
                    this.game.spawnNewStar(),
                    this.game.gainScore(),
                    this.node.destroy()
                }
            }),
            cc._RF.pop()
        },
        {}
    ]
},
{},
["Game","Player","Star"]
);


