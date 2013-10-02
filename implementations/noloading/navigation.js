/*
@author : Jean-Baptiste de Borman jb@noloading.com

@description: the main interactivity of the page
@function init : sets up selectionMenu; 
*/
var Navigation = {
	context : {},

	init : function() {
		"use strict"; 
		
		context = this;



			var arrowParams = new SVGFactory.Params();
			
			if (isTouch ()) {
			arrowParams.size = [40, 40];
			arrowParams.borderRadius = 20;
			}
			
			
			var rightArrow_svg = SVGFactory.getArrowButton(arrowParams);
			arrowParams.flipV_bool = true;
			var leftArrow_svg = SVGFactory.getArrowButton(arrowParams);
			var rightArrow_$ = $(rightArrow_svg);
			var leftArrow_$ = $(leftArrow_svg);
			var pos_y = $('.header').height() - rightArrow_$.attr("height") / 2 + 2;

			rightArrow_$.css('top', pos_y).css('right', 10);
			leftArrow_$.css('top', pos_y).css('left', 10);
			$('body').append(rightArrow_$);
			$('body').append(leftArrow_$);
			rightArrow_$.on("click tap touch", function() {
				context._swipe(+1);

			})
			leftArrow_$.on("click tap touch", function() {
				context._swipe(-1);

			})


		var params = new SVGFactory.Params();
		params.strokeWidth = 1.5;
		params.size = [18, 18];	
		params.strokePadding = 6;
	 
		

		var smallCloseButton_$ = $(SVGFactory.getCloseButton(params));

		var selectionMenu = new SelectionMenu($('.header a'), smallCloseButton_$);
		selectionMenu.onSelect = function() {
			if (this.selection_$) {

				Implementation.closeItems();
				var selection_str = this.selection_$.attr('data-select');
				_gaq.push(['_trackEvent', "mainMenu", selection_str]);  
			} else {
				/* = wildcard */ 
				var selection_str = "div";
				
				

			}
			project_$.each(function(index, element) {

				var element_$ = $(element);
				if (element_$.find(selection_str).length > 0) {
					var animProperty_str = '';
					if (ScreenTools.isPortrait()) {
						animProperty_str = 'top';
					} else {
						animProperty_str = 'left';
					}
					element_$.css(animProperty_str, 100 * index);
					$('#container').append(element_$);
					element_$.css('visibility', 'hidden');
					timeOut = window.setTimeout(function() {
						element_$.css('visibility', 'visible');
						element_$.css(animProperty_str, 0);
					}, 0);

				} else {
					element_$.detach();

				}
				if (!ScreenTools.isPortrait()) {

					$('html, body').animate({
						scrollLeft : 0
					}, 100);

				}
				Implementation.arrange ();
				

			})
		}
	},
	_swipe : function(sens_int) {
		trace("sens_int : " + sens_int)
		var scroll_dist = sens_int * $(window).innerWidth() - 200;
		var scrollLeft = $('body').scrollLeft() + scroll_dist;
        Implementation.closeItems (); 
		$('html,body').animate({
			scrollLeft : scrollLeft
		}, 500);

	}
}