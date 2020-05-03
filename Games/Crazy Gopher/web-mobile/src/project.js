window.__require=function t(e,n,i){function o(s,c){if(!n[s]){if(!e[s]){var r=s.split("/");if(r=r[r.length-1],!e[r]){var h="function"==typeof __require&&__require;if(!c&&h)return h(r,!0);if(a)return a(r,!0);throw new Error("Cannot find module '"+s+"'")}}var u=n[s]={exports:{}};e[s][0].call(u.exports,function(t){return o(e[s][1][t]||t)},u,u.exports,t,e,n,i)}return n[s].exports}for(var a="function"==typeof __require&&__require,s=0;s<i.length;s++)o(i[s]);return o}({Board:[function(t,e,n){"use strict";cc._RF.push(e,"51a46mvdBlM8IZIzl3oXIIv","Board"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.click_audio=this.father.click_audio,this.next_button=cc.find("next",this.node),this.next_button.on("touchstart",function(){this.eventStageOpen(!1)},this),this.next_button.active=!1,this.retry_button=cc.find("retry",this.node),this.retry_button.on("touchstart",function(){this.eventStageOpen(!0)},this),this.retry_button.active=!1,this.gopher_HP=cc.find("gopher HP",this.node),this.gopher_HP_label=this.gopher_HP.getComponent(cc.Label),this.player_HP=cc.find("player HP",this.node),this.player_HP_label=this.player_HP.getComponent(cc.Label)},onEnable:function(){},start:function(){},update:function(t){},lateUpdate:function(t){},onDisable:function(){},beforeDestroy:function(){},onDestroy:function(){},eventStageOver:function(t){t?(this.gopher_HP.active=!1,this.next_button.active=!0):(this.gopher_HP.active=!1,this.retry_button.active=!0)},eventStageOpen:function(t){cc.audioEngine.playEffect(this.click_audio,!1),this.next_button.active=!1,this.retry_button.active=!1,this.gopher_HP.active=!0;for(var e=this.father;e;)e.eventStageOpen&&e.eventStageOpen(t),e=e.father},updatePlayerHPLabel:function(){var t=this.father.gophers;this.player_HP_label.string=t.player_curr_HP},updateGopherHPLabel:function(t,e){var n=this.father.gophers;this.gopher_HP_label.string=n.gopher_curr_HP+"/"+n.gopher_total_HP}}),cc._RF.pop()},{}],Bottle:[function(t,e,n){"use strict";cc._RF.push(e,"b01f6mtouxMj61hCgQ7KIbs","Bottle"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.glass_prefab=this.father.glass_prefab,this._randint=this.father._randint,this.node.setPosition(0,30),this.action_duration=.5,this.glass=null},onEnable:function(){},start:function(){this.runAction()},update:function(t){},lateUpdate:function(){},onDisable:function(){},beforeDestroy:function(){this.addGlass()},onDestroy:function(){},addGlass:function(){this.glass=cc.instantiate(this.glass_prefab).getComponent("Glass"),this.glass.father=this.father,this.glass.node.setPosition(this.node.position),this.father.node.addChild(this.glass.node)},runAction:function(){cc.tween(this.node).parallel(cc.tween().by(.8*this.action_duration,{y:20}).by(.2*this.action_duration,{y:-2.5}),cc.tween().by(this.action_duration,{angle:400}),cc.tween().by(this.action_duration,{scale:3})).call(function(){this.beforeDestroy()},this).call(function(){this.node.destroy()},this).start()}}),cc._RF.pop()},{}],Glass:[function(t,e,n){"use strict";cc._RF.push(e,"b3c18y0hRJFx4qqWXavuO4P","Glass"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){var t=this.father.father.father;this.broken_audio=t.broken_audio,this.node.angle=360*Math.random()-180,this._randint=this.father._randint,this.action_duration=3+2*this._randint(5)},onEnable:function(){},start:function(){this.eventPlayerHit(),this.runAction()},update:function(t){},lateUpdate:function(){},onDisable:function(){},beforeDestroy:function(){0===this.father.father.player_curr_HP&&this.eventStageOver()},onDestroy:function(){},eventPlayerHit:function(){1===this.father.father.player_curr_HP&&(this.action_duration=2);for(var t=this.father;t;)t.eventPlayerHit&&t.eventPlayerHit(),t=t.father},eventStageOver:function(){for(var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=this.father;e;)e.eventStageOver&&e.eventStageOver(t),e=e.father},runAction:function(){cc.tween(this.node).call(function(){cc.audioEngine.playEffect(this.broken_audio,!1)},this).to(this.action_duration,{opacity:0}).call(function(){this.beforeDestroy()},this).call(function(){this.node.destroy()},this).start()}}),cc._RF.pop()},{}],God:[function(t,e,n){"use strict";cc._RF.push(e,"3feb1wCfqNLU6SzqJ3OVSxp","God"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){cc.game.addPersistRootNode(this.node),cc.tween(cc.find("New Canvas/loading",this.node.parent)).by(1,{angle:-3600}).repeatForever().start()},onEnable:function(){},start:function(){cc.director.loadScene("scene1")},update:function(t){},lateUpdate:function(t){},onDisable:function(){},beforeDestroy:function(){},onDestroy:function(){}}),cc._RF.pop()},{}],Gophers:[function(t,e,n){"use strict";cc._RF.push(e,"e7f0858f1FEnKr96QiXyole","Gophers"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this._randint=this.father._randint,this.gopher_prefab_list=this.father.gopher_prefab_list,this.node.setPosition(0,0),this.position_list=[cc.v2(-160,-50),cc.v2(-160,-100),cc.v2(-160,-150),cc.v2(-80,-50),cc.v2(-80,-100),cc.v2(-80,-150),cc.v2(0,-50),cc.v2(0,-100),cc.v2(0,-150),cc.v2(80,-50),cc.v2(80,-100),cc.v2(80,-150),cc.v2(160,-50),cc.v2(160,-100),cc.v2(160,-150)];var t=this.father.stage.stage_num;this.gopher_curr_HP=this.gopher_total_HP=4+this._randint(3)+Math.round(t/20),this.player_curr_HP=Math.max(4,this.gopher_curr_HP-Math.round(t/30)),this.gopher_num=3+this._randint(3)+Math.round(t/10),this.gopher_list=null,this.addGopher(),this.activeNewGopher()},onEnable:function(){},start:function(){},update:function(t){},lateUpdate:function(t){},onDisable:function(){},beforeDestroy:function(){},onDestroy:function(){},eventPlayerHit:function(){this.gopher_curr_HP>0&&this.player_curr_HP>0&&(this.player_curr_HP-=1)},evetGopherHit:function(){this.gopher_curr_HP>0&&this.player_curr_HP>0&&(this.gopher_curr_HP-=1)},addGopher:function(){var t=this.gopher_prefab_list[this._randint(this.gopher_prefab_list.length)],e=this._randint(this.position_list.length,this.gopher_num,!1).sort(function(t,e){return t-e});this.gopher_list=[];for(var n=0;n<this.gopher_num;n++){var i=cc.instantiate(t).getComponent("Gopher");i.father=this,i.node.setPosition(this.position_list[e[n]]),this.node.addChild(i.node),this.gopher_list.push(i)}},activeNewGopher:function(){this.gopher_curr_HP>0&&this.player_curr_HP>0&&(this.gopher_list[this._randint(this.gopher_num)].is_actived=!0)}}),cc._RF.pop()},{}],Gopher:[function(t,e,n){"use strict";cc._RF.push(e,"3091aNXb9NNeazMDGb6+jXO","Gopher"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this._randint=this.father._randint;var t=this.father.father;this.watermelon_prefab=t.watermelon_prefab,this.splash_prefab=t.splash_prefab,this.bottle_prefab=t.bottle_prefab,this.glass_prefab=t.glass_prefab,this.sparks_prefab=t.sparks_prefab,this.soul_prefab=t.soul_prefab,this.gopher=cc.find("mask/gopher",this.node),this.gopher.y=0,this.gopher.on("touchstart",this.onTouchStart,this),this.is_actived=!1,this.is_upping=!1,this.watermelon=null,this.splash=null,this.bottle=null,this.glass=null,this.sparks=null,this.soul=null},onEnable:function(){},start:function(){},update:function(t){!0===this.is_actived&&(this.is_actived=!1,this.runActionOne())},lateUpdate:function(t){},onDisable:function(){},beforeDestroy:function(){},onDestroy:function(){},onTouchStart:function(){this.is_upping&&this.evetGopherHit()},evetGopherHit:function(){this.is_upping=!1,this.gopher.stopAllActions(),1===this.father.gopher_curr_HP?(this.addSoul(),this.gopher.opacity=0):(this.addSparks(),this.runActionTwo());for(var t=this.father;t;)t.evetGopherHit&&t.evetGopherHit(),t=t.father},addWatermelon:function(){this.watermelon=cc.instantiate(this.watermelon_prefab).getComponent("Watermelon"),this.watermelon.father=this,this.node.addChild(this.watermelon.node)},addBottle:function(){this.bottle=cc.instantiate(this.bottle_prefab).getComponent("Bottle"),this.bottle.father=this,this.node.addChild(this.bottle.node)},addSparks:function(){this.sparks=cc.instantiate(this.sparks_prefab).getComponent("Sparks"),this.sparks.father=this,this.node.addChild(this.sparks.node)},addSoul:function(){this.soul=cc.instantiate(this.soul_prefab).getComponent("Soul"),this.soul.father=this,this.node.addChild(this.soul.node)},runActionOne:function(){var t=this.father.father.stage.stage_num,e=.7-.05*Math.round(t/20)+.1*this._randint(3),n=.6+.2*this._randint(5);cc.tween(this.gopher).call(function(){this.is_upping=!0},this).to(e,{y:20}).call(function(){this.is_upping=!1},this).call(function(){var t=Math.random();t<.3?this.addWatermelon():t>.7&&this.addBottle()},this).to(.2,{y:0}).delay(n).call(function(){this.activeNewGopher()},this.father).start()},runActionTwo:function(){var t=.6+.2*this._randint(5);cc.tween(this.gopher).delay(.8).to(.2,{y:0}).delay(t).call(function(){this.activeNewGopher()},this.father).start()}}),cc._RF.pop()},{}],Head:[function(t,e,n){"use strict";cc._RF.push(e,"4183f/FpcRBy6ucIMy5L7bE","Head"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.board_audio=this.father.board_audio,this.head_board=cc.find("head board",this.node),this.game_name=cc.find("game name",this.node),this.help_icon=cc.find("help icon",this.node),this.help_icon.on("touchstart",this.clickHelpIcon,this),this.help_text=cc.find("help text",this.node),this.help_text.on("touchstart",this.clickHelpText,this),this.help_text.active=!1},onEnable:function(){},start:function(){},update:function(t){},lateUpdate:function(t){},onDisable:function(){},beforeDestroy:function(){},onDestroy:function(){},clickHelpIcon:function(){cc.tween(this.node).call(function(){cc.audioEngine.playEffect(this.board_audio,!1)},this).to(.4,{y:250}).call(function(){this.help_icon.active=!1},this).call(function(){this.game_name.active=!1},this).call(function(){this.help_text.active=!0},this).to(.4,{y:160}).start()},clickHelpText:function(){cc.tween(this.node).call(function(){cc.audioEngine.playEffect(this.board_audio,!1)},this).to(.4,{y:250}).call(function(){this.help_icon.active=!0},this).call(function(){this.game_name.active=!0},this).call(function(){this.help_text.active=!1},this).to(.4,{y:160}).start()}}),cc._RF.pop()},{}],Scene1:[function(t,e,n){"use strict";cc._RF.push(e,"348a6wGWL1EIZ+g9agGU3i6","Scene1"),cc.Class({extends:cc.Component,properties:{gopher_prefab_list:{default:[],type:cc.Prefab},gophers_prefab:{default:null,type:cc.Prefab},watermelon_prefab:{default:null,type:cc.Prefab},splash_prefab:{default:null,type:cc.Prefab},bottle_prefab:{default:null,type:cc.Prefab},glass_prefab:{default:null,type:cc.Prefab},sparks_prefab:{default:null,type:cc.Prefab},soul_prefab:{default:null,type:cc.Prefab},broken_audio:{default:null,type:cc.AudioClip},hit_audio:{default:null,type:cc.AudioClip},swoon_audio:{default:null,type:cc.AudioClip},death_audio:{default:null,type:cc.AudioClip},board_audio:{default:null,type:cc.AudioClip},click_audio:{default:null,type:cc.AudioClip}},onLoad:function(){this.head=cc.find("head",this.node).getComponent("Head"),this.stage=cc.find("stage",this.node).getComponent("Stage"),this.board=cc.find("board",this.node).getComponent("Board"),this.head.father=this.stage.father=this.board.father=this,this.gophers=null},onEnable:function(){},start:function(){this.addGophers(),this.stage.stage_num+=1,this.stage.updateStageLabel(),this.board.updateGopherHPLabel(),this.board.updatePlayerHPLabel()},update:function(t){},lateUpdate:function(t){},onDisable:function(){},beforeDestroy:function(){},onDestroy:function(){},eventPlayerHit:function(){this.board.updatePlayerHPLabel()},evetGopherHit:function(){this.board.updateGopherHPLabel()},eventStageOver:function(t){this.gophers.node.destroy(),this.board.eventStageOver(t)},eventStageOpen:function(t){this.stage.eventStageOpen(t),this.addGophers(),this.board.updateGopherHPLabel(),this.board.updatePlayerHPLabel()},addGophers:function(){this.gophers=cc.instantiate(this.gophers_prefab).getComponent("Gophers"),this.gophers.father=this,this.node.addChild(this.gophers.node)},_randint:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(!1===n&&e>t)return[];var i=[],o=void 0;if(n)for(;i.length<e;)o=Math.min(Math.floor(Math.random()*t),t-1),i.push(o);else for(var a=new Set;i.length<e;)o=Math.min(Math.floor(Math.random()*t),t-1),a.size<a.add(o).size&&i.push(o);return 1===e?i[0]:i}}),cc._RF.pop()},{}],Soul:[function(t,e,n){"use strict";cc._RF.push(e,"45cc3fqat1JerV/KkA5X/t/","Soul"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){var t=this.father.father.father;this.death_audio=t.death_audio;var e=cc.find("mask",this.father.node),n=this.father.gopher;this.node.x=e.x+n.x+10,this.node.y=e.y+n.y-3,this.node.opacity=200},onEnable:function(){},start:function(){this.runAction()},update:function(t){},lateUpdate:function(t){},onDisable:function(){},beforeDestroy:function(){this.eventStageOver()},onDestroy:function(){},eventStageOver:function(){for(var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],e=this.father;e;)e.eventStageOver&&e.eventStageOver(t),e=e.father},runAction:function(){this.father.father;cc.tween(this.node).call(function(){cc.audioEngine.playEffect(this.death_audio,!1)},this).by(1,{opacity:-200,x:15,y:15}).call(function(){this.beforeDestroy()},this).call(function(){this.node.destroy()},this).start()}}),cc._RF.pop()},{}],Sparks:[function(t,e,n){"use strict";cc._RF.push(e,"d29feP/zOJEoYpFswmjWgQK","Sparks"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){var t=this.father.father.father;this.swoon_audio=t.swoon_audio;var e=cc.find("mask",this.father.node),n=this.father.gopher;this.node.x=e.x+n.x,this.node.y=e.y+n.y,this.action_duration=.02},onEnable:function(){},start:function(){this.runAction()},update:function(t){},lateUpdate:function(){},onDisable:function(){},beforeDestroy:function(){},onDestroy:function(){},runAction:function(){cc.tween(this.node).call(function(){cc.audioEngine.playEffect(this.swoon_audio,!1)},this).repeat(40,cc.tween().delay(this.action_duration).call(function(){this.node.scaleX*=-1},this)).call(function(){this.node.destroy()},this).start()}}),cc._RF.pop()},{}],Splash:[function(t,e,n){"use strict";cc._RF.push(e,"39575HPMENAl7PATous1H3I","Splash"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){var t=this.father.father.father;this.hit_audio=t.hit_audio,this.node.angle=360*Math.random()-180,this._randint=this.father._randint,this.action_duration=3+2*this._randint(5)},onEnable:function(){},start:function(){this.eventPlayerHit(),this.runAction()},update:function(t){},lateUpdate:function(){},onDisable:function(){},beforeDestroy:function(){0===this.father.father.player_curr_HP&&this.eventStageOver()},onDestroy:function(){},eventPlayerHit:function(){1===this.father.father.player_curr_HP&&(this.action_duration=2);for(var t=this.father;t;)t.eventPlayerHit&&t.eventPlayerHit(),t=t.father},eventStageOver:function(){for(var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=this.father;e;)e.eventStageOver&&e.eventStageOver(t),e=e.father},runAction:function(){cc.tween(this.node).call(function(){cc.audioEngine.playEffect(this.hit_audio,!1)},this).to(this.action_duration,{opacity:0}).call(function(){this.beforeDestroy()},this).call(function(){this.node.destroy()},this).start()}}),cc._RF.pop()},{}],Stage:[function(t,e,n){"use strict";cc._RF.push(e,"225d2oSaoNOyKGlFtqCRC0S","Stage"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.stage_num=0,this.stage_label=cc.find("label",this.node).getComponent(cc.Label)},onEnable:function(){},start:function(){},update:function(t){},lateUpdate:function(t){},onDisable:function(){},beforeDestroy:function(){},onDestroy:function(){},eventStageOpen:function(t){this.stage_num+=t?0:1,this.stage_num=this.stage_num>99?1:this.stage_num,this.updateStageLabel()},updateStageLabel:function(){this.stage_label.string=""+(this.stage_num<10?0:"")+this.stage_num}}),cc._RF.pop()},{}],Template:[function(t,e,n){"use strict";cc._RF.push(e,"2eab85cg0RL6rFtzNEper0S","Template"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){},onEnable:function(){},start:function(){},update:function(t){},lateUpdate:function(t){},onDisable:function(){},beforeDestroy:function(){},onDestroy:function(){}}),cc._RF.pop()},{}],Watermelon:[function(t,e,n){"use strict";cc._RF.push(e,"436bdVqhu1G/Z8He3/gY9yz","Watermelon"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.splash_prefab=this.father.splash_prefab,this._randint=this.father._randint,this.node.setPosition(0,30),this.action_duration=.5,this.splash=null},onEnable:function(){},start:function(){this.runAction()},update:function(t){},lateUpdate:function(){},onDisable:function(){},beforeDestroy:function(){this.addSplash()},onDestroy:function(){},addSplash:function(){this.splash=cc.instantiate(this.splash_prefab).getComponent("Splash"),this.splash.father=this.father,this.splash.node.setPosition(this.node.position),this.father.node.addChild(this.splash.node)},runAction:function(){cc.tween(this.node).parallel(cc.tween().by(.8*this.action_duration,{y:20}).by(.2*this.action_duration,{y:-2.5}),cc.tween().by(this.action_duration,{angle:400}),cc.tween().by(this.action_duration,{scale:3})).call(function(){this.beforeDestroy()},this).call(function(){this.node.destroy()},this).start()}}),cc._RF.pop()},{}]},{},["Board","Bottle","Glass","God","Gopher","Gophers","Head","Scene1","Soul","Sparks","Splash","Stage","Template","Watermelon"]);