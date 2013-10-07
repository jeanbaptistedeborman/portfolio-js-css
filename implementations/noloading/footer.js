/**
 @author Jean-Baptiste de Borman  - jb@noloading.com
 **/
/*jslint vars:true, white:true, nomen:true, plusplus:true */
/*global Implementation,$, documentation_$:true,sourceDocumentation_$:true, _gaq, SVGFactory */

var Footer = {
	init : function() {
		"use strict"; 
		
		var sourceDocumentation_$; 
		
		Implementation.addPageUrlToVcard (); 

		documentation_$ = $('.popupContainer');
		documentation_$.detach();

		$('#sourceButton').on("click tap touch", function() {

			sourceDocumentation_$ = documentation_$.find('#documentation');

			documentation_$.css("display", 'block');
			documentation_$.css("height", 0);
			$("body").append(documentation_$);

			var timeOut = window.setTimeout(function() {
				documentation_$.css('height', 600); 
			}, 0);
			_gaq.push(['_trackEvent', "tools", "Show code"]); 
			
		});

		documentation_$.each(function(index, element) {
			var element_$ = $(element);

			var params = new SVGFactory.Params();

			var closeButton_$ = $(SVGFactory.getCloseButton(params));
			element_$.append(closeButton_$);
			
			closeButton_$.on('click tap touch', function() {
				element_$.height(0);
				var timeOut = window.setTimeout(function() {
					element_$.hide(); 
				}, 500);

			});
		});

	}
};
