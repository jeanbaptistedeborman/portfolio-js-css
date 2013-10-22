/*
 @author : Jean-Baptiste de Borman jb@noloading.com

 @description: dedicated to scroll manipulations 
 @ param {object} target_$  a jQuery selection of the container where the scroll is happening.  
 @function swipe scrolls the container

*/
/*jslint vars:true, white:true, nomen:true, plusplus:true */
/*global $, trace, SVGFactory, SelectionMenu,Implementation,project_$, ScreenTools,  _gaq , isTouch*/

function ScrollManipulation(target_$) {"use strict";

	this.swipe = function(direction_int, distance_num) {
		var scrollLeft = target_$.scrollLeft() + (distance_num*direction_int);
		trace ('scrollLeft : ' + scrollLeft); 
		target_$.animate({
			scrollLeft : scrollLeft
		}, 500);

	};

}   