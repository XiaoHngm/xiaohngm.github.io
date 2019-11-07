	var mission1 = false;
	var mission2 = false;
	
    // 1. Wait for the onload even	
    window.addEventListener("load",function() 
	{		  
		// Set up a basic Quintus object
		// with the necessary modules and controls
		var Q = window.Q = Quintus({ development: true })
			    .include("Sprites, Scenes, Input, 2D, TMX")
			    .setup({ width: 384, height: 384})
			    .controls(true)
		//width: 640, height: 480
		// Add in the default keyboard controls
		// along with joypad controls for touch
		Q.input.keyboardControls();
		Q.input.joypadControls();

		Q.gravityX = 0;
		Q.gravityY = 0;

		/* //var SPRITE_PLAYER = 1;
		   var SPRITE_TILES = 2;
		   var SPRITE_ENEMY = 3;
		   var SPRITE_DOT = 4;*/
	    Q.SPRITE_NONE = 0;
		Q.SPRITE_PLAYER = 1;
		Q.SPRITE_COLLECTABLE = 2;			
		Q.SPRITE_BOXLOCK = 4;
		Q.SPRITE_BOX = 8;
	    Q.component("boxManControls", 
		{
			// default properties to add onto our entity
		    defaults: { speed: 100, direction: 'up' },

			// called when the component is added to
			// an entity
			added: function() 
			{
				var p = this.entity.p;

				// add in our default properties
				Q._defaults(p,this.defaults);

				// every time our entity steps
				// call our step method
				this.entity.on("step",this,"step");
			},
			
			step: function(dt) 
			{
				// grab the entity's properties
				// for easy reference
				var p = this.entity.p;

				// rotate the player
				// based on our velocity
				if(p.vx > 0) 
				{
					p.angle = 90;
				} 
				else if(p.vx < 0) 
				{
					p.angle = -90;
				} 
				else if(p.vy > 0) 
				{
					p.angle = 180;
				} else if(p.vy < 0) 
				{
					p.angle = 0;
				}
					
			
				// grab a direction from the input
				/*p.direction = Q.inputs['left']  ? 'left' :
								Q.inputs['right'] ? 'right' :
								Q.inputs['up']    ? 'up' :
								Q.inputs['down']  ? 'down' : 'nothing';*/
				if(Q.inputs['left'] == true)
				{
					p.direction = 'left';
				}
				else if(Q.inputs['right'] == true)
				{
					p.direction = 'right';
				}
				else if(Q.inputs['up'] == true)
				{
					p.direction = 'up';
				}
				else if(Q.inputs['down'] == true)
				{
					p.direction = 'down';
				}
				else
				{
					p.direction = 'nothing';
				}
				
			  
				// based on our direction, try to add velocity
				// in that direction
				switch(p.direction) 
				{		    
					case "left":
						p.vx = -p.speed;
						p.vy = 0;						
						break;
						
					case "right":
						p.vx = p.speed; 
						p.vy = 0;					
						break;
						
					case "up":
						p.vy = -p.speed;
						p.vx = 0;					
						break;
						
					case "down":
						p.vy = p.speed;
						p.vx = 0;					
						break;
						
					case "nothing":
						p.vx = 0;
						p.vy = 0;
						break;
				}			  

			
			}
		});
		  
		Q.Sprite.extend("Player", 
		{
			init: function(p) 
			{
			  p.sheet = "player";
			  p.frame = 0;
			  p.type = Q.SPRITE_PLAYER;	
			  p.collisionMask = Q.SPRITE_DEFAULT;
			  this._super(p);
			  this.add("2d, boxManControls");
			}		
		});
		/*			  
		Q.Sprite.extend("Box",
		{
			init: function(p)
			{
				p.sheet = "Map";
				p.frame = 32;
				p.sensor = false;
				p.type = Q.SPRITE_BOX;
				p.collisionMask = Q.SPRITE_PLAYER;
				this._super(p);
				this.add("2d");			
				
			}		
		});
		*/	
			
		
			
		  
		Q.scene("level1",function(stage) 
		{
			Q.stageTMX("test.tmx", stage);  
			var player = Q("Player").first();
		});

		Q.loadTMX("test.tmx", function() 
		{        
			Q.stageScene("level1");
		});

    });
