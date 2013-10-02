// JavaScript Document
function Animation_jb (img_url,json_obj) {
	
	var context = this;
	
	this.frames_json; 
	var interval;
	var img_url = img_url; 
	this.tag_$ = $('<div></div>');
	this.currentFrame = 0;
	this.totalFrames; 
	var ready_bool = false;
		this.frames_json= json_obj; 
		
		
	
	
	// events
	this.onReady = function (){
		}
	    
	    
	 
		
	
	
	
	this.stop = function (){
		clearInterval (interval);
//trace ('stop');
		}
	this.loop = function (){
		clearInterval (interval); 
		interval = setInterval (nextFrameLoop, 10); 
		
		
		
		}
		
		
		nextFrameLoop = function (){
			var nextFrame = (context.currentFrame+1)%context.totalFrames;
			context.gotoFrame (nextFrame);
			
			}
	this.play = function (){
		clearInterval (interval); 
		interval = setInterval (this.nextFrame, 10); 
		
		}
		
		this.nextFrame = function () {
		//trace ("this.nextFrame()"); 
			var nextFrame = context.currentFrame+1; 
			if (nextFrame < context.totalFrames){ 
			context.gotoFrame (context.currentFrame+1);
			} else {
				context.stop (); 
				}
			} 
		this.lastFrame = function () {
			
				context.gotoFrame (context.totalFrames-1);
			
			}
	initAnim = function (){
		//trace ("animation init");
		
		
		context.firstFrame_json = context.frames_json.frames[0].frame; 
		//context.tag_$.css ('background', '#f00'); 
		context.tag_$.width (context.firstFrame_json.w);
		context.tag_$.height (context.firstFrame_json.h);
		context.tag_$.css('background-image',"url("+img_url+")"); 
		context.totalFrames = context.frames_json.frames.length;
		//trace ("TOTAL FRAMES SET :" +context.totalFrames); 
		 
		ready_bool = true; 
//context.loop (); 
		
		
	
		
		
		
		}
    
		
		
	
		
this.gotoAndStop = function (frame_num) {
	//trace (frame_num); 
	this.stop (); 
	this.gotoFrame (frame_num)
	
	
	}

this.gotoFrame = function (frame_num) {
 if (ready_bool && frame_num > 0 && frame_num <= context.totalFrames) {
	//console.log (frame_num);
	context.currentFrame = frame_num; 
	//console.log ('frame-num : ' + frame_num)
	var img_pos = context.frames_json.frames[frame_num-1].frame;  
	context.tag_$.css ('background-position', -img_pos.x + 'px ' + -img_pos.y + 'px ');   
	 }

}
		initAnim ();
		

	 
	
}