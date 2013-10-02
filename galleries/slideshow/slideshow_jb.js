/**
@author : Jean-Baptiste de Borman - jb@noloading.com

@description : A simple lightbox

@constructor
@param  {object} parent_$ : the jquery-html element containing the slideshow.
@param  {object} imgList_$ : a jquery-selection of <img> tags.
@param {number} delay-sec : the time before displaying the next image. 
@param {int} img_height : the height of each image (width is adjusted proportionally).

@function destroy : removes and clean, stops the timer.  
 
*/

var Slideshow_jb = function(parent_$, imgList_$, delay_sec, img_height) {

	var context = this;
	var currentImg_num;
	var img_num = imgList_$.length;

	context.container_$ = $("<div>");
	//context.container_$.width (parent_$.css ('width').split ('px')[0]); 
	//trace (parent_$.css ('width').split ('px')[0]);
	context.navigation_$ = $('<div>');
	context.container_$.append(context.navigation_$);
	context.container_$.append(imgList_$);
	//context.container_$.data('slideShow_obj', context);
	context.height = img_height;
	
	

	//PUBLIC METHODS

 	

	this.destroy = function() {
		//trace ("DESTROY");
		if (context.timer !== undefined) {
			context.timer.destroy();
		}
		//clearInterval (interval);
		context.timer = null;
		context.container_$.remove();
		context.container_$ = null;
		context = null;
		
	}
	/// PRIVATE METHODS
	_show = function(index) {
		
		
		if (context !=null && context != undefined) {
			
		context.timer.reset();
		context.timer.start();
		index = index % img_num;

		var previousButton_$ = $(context.container_$.find ('.navigationButton')[currentImg_num]);
		var button_$ = $(context.container_$.find ('.navigationButton')[index]);
		var img_$ = $($(context.container_$.find ('img'))[index]);
		var previous_img_$ = $($(context.container_$.find ('img'))[currentImg_num]);
		var legend_$ = $('<div/>');
		img_$.css('display', "block");

		previous_img_$.css('opacity', 0);
		legend_$.addClass('legend');
		legend_$.text(img_$.attr('alt'));
		button_$.addClass('selected');
		previousButton_$.removeClass('selected');
		currentImg_num = index;

		context.container_$.find('.legend').remove();
		img_$.height(context.height);
		//img_$.css('left', (context.container_$.width() - img_$.width()) / 2)

		legend_$.css('top', context.height - 20);

		context.container_$.prepend(legend_$);

		img_$.css('opacity', 1);

		var margin_pix = context.navigation_$.width();
		legend_$.css('padding-left', margin_pix).css('padding-right', margin_pix);
		//legend_$.width(context.container_$.width() - margin_pix * 2);

		legend_$.css('top', context.height + 10).css('opacity', 1);
	}
	}
	_addNav = function() {
		var MARGIN = 30;
		for (var n = 0; n < imgList_$.length; n++) {
			var button_$ = $('<div>');
			button_$.addClass('navigationButton');

			button_$.text(n + 1);
			context.navigation_$.append(button_$);
			button_$.css('left', n * MARGIN);
			button_$.bind('mousedown tap', function() {
				_show($(this).index());
			})
		}
		context.navigation_$.width((n + 1) * MARGIN);
	}
	_init = function() {
		var interval = window.setInterval (function (){
		var allImagesAreLoaded_bool = true; 
		parent_$.prepend(context.container_$);
		imgList_$.each (function (index, element) {

		
		if (!element.complete || element.naturalWidth==0) {
		  	
		allImagesAreLoaded_bool = false;		
			}	
			
			
	  }); 
	  
		
		 

    if (allImagesAreLoaded_bool) {
		clearInterval (interval); 

		if (context != null && context != undefined) {
	
			context.container_$.children ('img').each (function (index, element){

		
		
		}); 
	
	
	

		var hr_$ = $('<hr>');
		hr_$.addClass('divider');
		context.container_$.addClass('slideshow');
		context.container_$.append(hr_$);
		context.navigation_$.addClass('navigation');
		context.navigation_$.css('top', context.height).css('left', 0);
		context.width = parent_$.width();
		imgList_$.hide();
		context.container_$.append(this.navigation_$);
		context.timer = new Timer_jb(null, delay_sec, null);

		context.timer.onTimerFinish = function() {
			_show(currentImg_num + 1);
		}

		hr_$.css('top', context.height); 
		_addNav();
		_show(0);
		
}}
		}, 10)
		
		} 
	_init (); 
}