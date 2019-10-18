//通关条件1、通关条件2
var mission1 = false;
var mission2 = false;
	
// 1.当加载窗口时就执行		
window.addEventListener("load",function() 
{

	//创建一个初始化Quintus基本对象和设置之
	//开发者模式会自动重载资源
	//加载Audio音效、Sprites图片、Scenes场景、Input控制、2D世界、Anim动画、
	//TMX地图文件、Touch触控、UI界面的模块
	//游戏世界大小宽600px 高600px
	//使用UI的BUTTON按钮的话，就一定要加上touch()和加载Touch模块 否则按钮事件无效
	//音效播放也必须加上enableSound()
	var Q = window.Q = Quintus({ audioSupported: [ 'mp3' ]})
	   		      .include("Audio, Sprites, Scenes, Input, 2D, Anim, TMX, Touch, UI")
			      .setup({ width: 600, height: 600})
			      .controls(true)
				  .touch() 
				  .enableSound();
				
	// 加入基本的键盘控制跟游戏杆控制(用于触控面板)
	Q.input.keyboardControls();
	Q.input.joypadControls();
	
	//取消游戏世界的重力设置
	Q.gravityX = 0;
	Q.gravityY = 0;
	
	//设置游戏图层
	Q.SPRITE_NONE = 0;
	Q.SPRITE_PLAYER = 1;
	Q.SPRITE_COLLECTABLE = 2;			
	Q.SPRITE_BOXLOCK = 4;
	Q.SPRITE_BOX = 8;
		
	//主角控制
	Q.component("boxManControls", 
	{
		//设置主角移动速度100, 初始方向朝上
	    defaults: { speed: 100, direction: 'up' },

		//附加在玩家对象身上
		added: function() 
		{
			var p = this.entity.p;

			//将设置给当前对象
			Q._defaults(p,this.defaults);

			//调用执行step
			this.entity.on("step",this,"step");
		},
			
		step: function(dt) 
		{
			//获取当前玩家对象
			var p = this.entity.p;

			//根据玩家对象的移动方向来旋转人物
			//往右走时
			if(p.vx > 0) 
			{
				p.angle = 90;
			} 
			
			//往左走时
			else if(p.vx < 0) 
			{
				p.angle = -90;
			} 
				
			//往下走时
			else if(p.vy > 0) 
			{
				p.angle = 180;
			} 
				
			//往上走时
			else if(p.vy < 0) 
			{
				p.angle = 0;
			}
	
			//判断按下的键盘按键来控制玩家对象的方向
			/*p.direction = Q.inputs['left']  ? 'left' :
							Q.inputs['right'] ? 'right' :
							Q.inputs['up']    ? 'up' :
							Q.inputs['down']  ? 'down' : 'nothing';*/
			//当左箭头键按下时
			if(Q.inputs['left'] == true)
			{
				p.direction = 'left';
			}
				
			//当右箭头键按下时			
			else if(Q.inputs['right'] == true)
			{
				p.direction = 'right';
			}
			
			//当上箭头键按下时					
			else if(Q.inputs['up'] == true)
			{
				p.direction = 'up';
			}
					
			//当下箭头键按下时		
			else if(Q.inputs['down'] == true)
			{
				p.direction = 'down';
			}
			  
			//什么事都没做时		
			else
			{
				p.direction = 'nothing';
			}
				
			//按照给予的玩家方向值判断该方向增加速度		
			switch(p.direction) 
			{		    
				//给予玩家 加速度x = 本身的移动速度设置(-负数等于反方向 + 正数为正方向)
				case "left":					
					p.vx = -p.speed;
					p.vy = 0;						
					break;
							
				case "right":
					p.vx = p.speed; 
					p.vy = 0;					
					break;
						
				//给予玩家 加速度y = 本身的移动速度设置(-负数等于反方向 +正数为正方向)
				case "up":
					p.vy = -p.speed;
					p.vx = 0;					
					break;
							
				case "down":
					p.vy = p.speed;
					p.vx = 0;					
					break;
				
				//如果什么都没做 就停止
				case "nothing":
					p.vx = 0;
					p.vy = 0;
					break;
			}
		}
	});
		  
	//玩家对象
	Q.Sprite.extend("Player", 
	{
		init: function(p) 
		{
			//在tmx的加载图片集名称
			p.sheet = "Player";
			
			//加载动画对象名称
			p.sprite = "Player";      
			
			//由左往右数 在图片集的第几张图片 从0开始
			p.frame = 0;
			
			//设置玩家对象的图层值
			p.type = Q.SPRITE_PLAYER;	
			
			//设置玩家对象的碰撞目标图层
			p.collisionMask = Q.SPRITE_DEFAULT;
			
			//初始创建该对象
			this._super(p);	
			
			//加载2d、动画、玩家对象的控制组件
			this.add("2d, animation, boxManControls");
		},
			
		step: function(dt) 
		{		
			//当按下左右上下箭头键就播放玩家走路动画
			if(Q.inputs['left'] || Q.inputs['right'] ||
			   Q.inputs['up']   || Q.inputs['down'])
			{
				this.play("player_walk");
			}
		
			//播放玩家待机动画
			else
			{					
				this.play("player_idel");
			}
		}
	});
		
	//箱子对象
	Q.Sprite.extend("Box",
	{
		init: function(p)
		{
			//在tmx的加载图片集名称
			p.sheet = "Map";
			p.frame = 5;
			
			//sensor传感器 设为关闭
			p.sensor = false;	
			p.type = Q.SPRITE_BOX;			
			
			//碰撞屏蔽 只跟玩家对象碰撞做反应
			p.collisionMask = Q.SPRITE_PLAYER;
			this._super(p);
			this.add("2d");	
		}		
	});
			
	//箱子目的地对象
	Q.Sprite.extend("Box_lock",
	{
		init: function(p)
		{		
			//在tmx的加载图片集名称
			p.sheet = "Map";
			
			//取第一张透明图 实现透明碰撞区
			p.frame = 0;
			
			//sensor传感器 设为开启时，可以让其他对象穿透
			//且不会移动该对象
			p.sensor = true;
			p.type = Q.SPRITE_BOXLOCK;
			
			//碰撞屏蔽 设为只跟箱子对象碰撞做反应
			p.collisionMask = Q.SPRITE_BOX;
							
			this._super(p);
			this.add("2d");
			
			//当传感器碰撞了就执行这个函数
			this.on("sensor");
		},
	
		//当传感器碰撞了可以调回 该碰撞物col
		sensor: function(col) 
		{
			//可以直接以下列来设置该碰撞物的sensor值
			//col.p.sensor = this;
			
			//当箱子摆放区域被撞到就设为 Q.SPRITE_NONE
			//不重复判断也不与任何对象感应碰撞
			this.p.collisionMask = Q.SPRITE_NONE;	

			//如果通关条件1或通关条件2的变量有一个还是没满足
			if(mission1 == false | mission2 == false)
			{
				//如果通关条件1满足
				if(mission1)
				{
					mission2 = true;					
				}		
				
				//如果通关条件1没有满足
				else
				{
					mission1 = true;						
				}
			}			
		
			//如果两个通关条件都满足了 
			if(mission1 && mission2)
			{					
				//播放胜利欢呼声
				//先调整音量 再播放特定音效
				Q.audio.volume = 1;
				
				//声音文件必须放在项目文件夹内的audio文件夹内
				//没有的话 可以自己创建同名
				//Q.audio.play('文件名.文件类型');
				Q.audio.play('soundclip.mp3');
				
				//显示胜利提示窗口和游戏重新开始按钮
				Q.stageScene("endGame",1, { label: "You Won!" }); 					
			}						
		}			
	});
	
	//游戏主场景level1
	//一开始游戏就只执行一次
	Q.scene("level1",function(stage) 
	{
		//载入TMX场景
		Q.stageTMX("map1.tmx", stage); 
		
		//创建加载玩家角色
		var player = Q("Player").first();
			
		//一开始默认通关条件为false
		mission1 = false;
		mission2 = false;
					
		//先调整音量 再播放特定音效
		Q.audio.volume = 0.3;
		
		//播放特效且设置为循环播放，并且音量减半
		//Q.audio.play("audio文件夹下的文件名", { 属性设置});
		Q.audio.play("bgm.mp3", { loop: true, volume:0.5});				
	});

	//胜利窗口UI画面
	Q.scene('endGame',function(stage) 
	{
		//绘制UI窗口
		var container = stage.insert(new Q.UI.Container({
		x: Q.width/2, y: Q.height/2, fill: "rgba(220,220,220,0.8)"
		}));
		  
		//绘制按钮在container窗口内  
		var button = container.insert(new Q.UI.Button({
		x: 0, y: 0, fill: "#ffffff", label: "Play Again"
		})); 
		
		//绘制标签在container窗口内
		//stage.options.label 检测返回的label标题名称													  
		var label = container.insert(new Q.UI.Text({
		x:10, y: -10 - button.p.h, label: stage.options.label
		}));
		  
		//当按下按钮就会重新开始游戏
		button.on("click",function() 
		{
			//先停止所有的音乐 避免重复播放
			Q.audio.stop();
			
			//清除当前画面的所有场景画面
			Q.clearStages();
			
			//重新加载level1 游戏主场景
			Q.stageScene('level1');				
		});
		  
		//设置窗口大小去容纳该窗口内的内容
		container.fit(20);
	});
		
	//载入资源
	Q.loadTMX("map1.tmx, soundclip.mp3, bgm.mp3, player.json, player.png", function() 
	{       
		//载入玩家动画文件
		Q.compileSheets("player.png","player.json");
		
		//设置玩家动画组件的不同人物动画
		Q.animations("Player",
		{
			//动画片段名称: { frames第几张图片是播放范围, rate播放速率...等属性 }
			player_idel: { frames:[0], rate: 1/2 },			  
			player_walk: { frames:[1, 0], rate: 1/2 }
		});
			
		//载入完资源后才载入游戏主场景	
		Q.stageScene("level1");			
	});		
});