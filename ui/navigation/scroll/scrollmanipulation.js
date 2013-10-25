/*
 @author : Jean-Baptiste de Borman jb@noloading.com

 @description: a class dedicated to scroll manipulations
 @ param {object} target_$ :  a jQuery selection of the container where the scroll is happening.
 @param {object} uiElements : an instance of the ScrollManipulation.uiElements containing a reference to the navigation buttons. 
 @function swipe: scrolls the container
 */

/*jslint vars:true, white:true, nomen:true, plusplus:true */
/*global $, trace, SVGFactory, SelectionMenu,Implementation,project_$, ScreenTools,  _gaq , isTouch*/


function ScrollManipulation(target_$, uiElements) {"use strict";

	trace (uiElements.length); 
	


	this.swipe = function(direction_int, distance_num) {
			var n; 
		var scrollLeft = target_$.scrollLeft() + (distance_num * direction_int);
		trace('scrollLeft : ' + scrollLeft);
		target_$.animate({
			scrollLeft : scrollLeft
		}, 500);
		
		for (n in uiElements) {
		var uiElement_$ = uiElements[n];
		if (uiElement_$.jquery)  {
			/* PATCH : addClass does not work */
		uiElement_$.attr ('class', "svgArrow active"); 
		trace ("uiElement_$ : " + uiElement_$[0]); 
	
		//uiElement_$.hide ();  
		
		
	}   

	}

};
} 
 /*
 @description: an instancieated object to collect the uiElments affectd by the scroll
*/
ScrollManipulation.UIElements = function () {
	"use strict"; 
	
	this.leftButton_$ = "a"; 
	this.rightButton_$ = "b"; 
	/*for later: */

};

