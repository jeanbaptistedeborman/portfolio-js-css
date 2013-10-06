/*jslint vars:true, white:true, nomen:true, plusplus:true */
/*global $, trace, Timer_jb, ScreenTools,_gaq, UserAgent, Slideshow_jb, Footer, Navigation, isTouch, MobileFixes, ResponsiveTiles, SVGFactory*/

var project_height = 0;
var content_$;
var closeButton_$;
var gallery_timeout;
var lastSlideShow_obj;
var OPEN_WIDTH = 800;
var OPEN_HEIGHT = 550;

var boxDefaultWidth_num;
var boxDefaultHeight_num;
var openItems_array = [];
var slideshows_array = [];
var project_$;
var portraitOrientation_bool;
var documentation_$;
var responsiveTiles;

var Implementation = {

	context : this,

	arrange : function() {"use strict";

		responsiveTiles.arrange();

	},
	addPageUrlToVcard : function() {"use strict";

		var vCardLink_$ = $('#vCardLink');

		vCardLink_$.attr('href', vCardLink_$.attr('href') + window.location.href);

	},
	allowChangeScrollDirection: function  () {"use strict"; 
		
		
		return !UserAgent.anyMobile (); 
		
	}, 
	
	createParticipationList : function() {"use strict";

		$('.project').each(function(index, element) {
			var xml_str = String($(element).find ('participation')[0].outerHTML);
			var xml = $.parseXML(xml_str);
			var xml_$ = $(xml);
			var string = "";

			xml_$.find('participation').children().each(function(index, element) {
				string += "<li>" + $($('descriptionContenu').find(element.nodeName)).text();

			});

			$(element).find('.description').append("<ul class ='participation'>" + string + "</div>");

		});
	},
	closeItem : function(item_$) {"use strict";

		var this_$ = $(this);
		item_$.removeAttr('style');
		item_$.children().show();
		closeButton_$.detach();

		item_$.bind('mouseup touch tap', Implementation.clickBox);

		Implementation.arrange();
	},

	closeItems : function() {"use strict";
		while (openItems_array.length > 0) {
			this.closeItem(openItems_array.pop());

		}
		while (slideshows_array.length > 0) {
			slideshows_array.pop().destroy();

		}

		$('.slideshow').remove();
	},

	clickBox : function(e) {"use strict";
		if (e.target.nodeName.toUpperCase() !== "A") {
			Implementation.closeItems();
			var this_$ = $(this);
			this_$.unbind();
			openItems_array.push(this_$);

			if (ScreenTools.isPortrait() || !Implementation.allowChangeScrollDirection ()) {
				this_$.height(OPEN_HEIGHT);

			} else {
				this_$.width(OPEN_WIDTH);
			}
			this_$.children("div, img").hide();
			
			var noscript_$ = this_$.find('.content').find('noscript');
			var img_str = $.parseHTML("<div>" + noscript_$.text() + "</div>");
			var img_$ = $(img_str).find('img');

			closeButton_$.show();
			Implementation.arrange();
			var selection_str = this_$.find('h2').text();
			_gaq.push(['_trackEvent', "clickBox", selection_str]);
			var slideshow = new Slideshow_jb(this_$, img_$, 50, 450);
			lastSlideShow_obj = slideshow;
			slideshows_array.push(slideshow);
			this_$.append(closeButton_$);
			this_$.append (this_$.find (".linkButton")); 
		}

	}
};

$(document).ready(function() {"use strict";



	if (UserAgent.msie() > 8 || UserAgent.msie() === -1) {
		
		
		
		if (!Implementation.allowChangeScrollDirection ()) {
			
			$('html').removeClass ('changeScrollDirection'); 
			
		}

		//Footer.init();
		Navigation.init();

		project_$ = $('.project');
		responsiveTiles = new ResponsiveTiles($('body,html'), $('#container'));

		MobileFixes.zoomAndroid(1200, 1200);

		$('html, body').scrollLeft(0);

		project_$.each(function(index, element) {
			$(element).data("index", index);

		});

		content_$ = $('.content');
		project_$.bind('mouseup touch tap', Implementation.clickBox);
		var params = new SVGFactory.Params();
		//params.size = [20, 20];
		params.flipV_bool = true;
		params.strokePadding = 6;

		if (isTouch()) {
			params.borderRadius = 20;
			params.size = [40, 40];
			params.strokePadding += 2;

		}

		closeButton_$ = $(SVGFactory.getCloseButton(params));
		closeButton_$.attr('id', 'closeButton');
		closeButton_$.bind('click tap', function() {
			Implementation.closeItems();

		});

		Implementation.createParticipationList();

		project_height = $('.projet').height();

		var docLink_$ = $(".linkButton");
		docLink_$.text("Voir l'application");
		docLink_$.attr("target", "_blank");

		var onResize = function() {
			var changeCond1 = portraitOrientation_bool !== undefined;
			var changeCond2 = portraitOrientation_bool !== ScreenTools.isPortrait();
			var orientationChange_bool = changeCond1 && changeCond2;

			if (ScreenTools.isPortrait()) {

				$('html,body').width("");
				$('.project').each(function(index, element) {
					var project_$ = $(element);

				});

			}
			if (orientationChange_bool) {

				Implementation.closeItems();
				Implementation.arrange();

				MobileFixes.reset();
			} else {
				Implementation.arrange();
			}

			portraitOrientation_bool = ScreenTools.isPortrait();

		};

		$(window).resize(function(e) {
			onResize();
		});

		onResize();
	} else {
		// OLD BROWSERS
		$('#documentation').hide().remove();
		$('.content').hide().remove();
		$('#selectionMenu').hide().remove();
		$('#data').hide().hide().remove();
		$('#sourceButton').hide().remove();

	}

})