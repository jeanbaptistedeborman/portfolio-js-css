// JavaScript Document
//Author: Jean-Baptiste de Borman - jb@noloading.com

//@description : this places regroups the dirty and -hopefully- temporary tricks used in this application.



var MobileFixes = {
	// Description: sets the zoom of Android devices to fit content when size set in <viewport> does not work.

	//Diagnostic: viewport.width or height does not work on Android default browser. (and, btw,  viewport.height breaks the responsive stylesheet iOS Safari).

	//Fix:  this script uses the initial-scale property of the viewport tag instead of height or width.

	//Result : Works on Android default browser and Android Chrome.

	zoomAndroid : function(appWidth, appHeight) {

		if (UserAgent.android()) {
			if (ScreenTools.isPortrait()) {
				var screenWidth = window.innerWidth;
				var scale_num = screenWidth / appWidth;

			} else {
				var screenHeight = window.innerHeight;
				var scale_num = screenHeight / appHeight;
				//$('h1').text("screenHeight : " + screenHeight + "  / " + scale_num);

			}

			$("#vp").attr("content", "initial-scale=" + scale_num);
			if (scale_num < .4) {
				$('body').addClass('largeFonts');
				//If zoom is too strong, allows to change for large fonts via CSS.  (Not sure it is useful : probably better to detect phone with user-agent).
			}
		}

	},

	//Description : brutal hack used after orientation change when responsive layout does not display properly without refresh.

	//Diagnostic : When the device is rotated, IOS Safari does not display the new design properly. There is also a non-mobile issue : some sizes cannot be measured properly during the transition-animation. 

	reset : function() {
		
		//this.zoomAndroid (); 

		if (UserAgent.android()) { 
			$('body').hide();
			window.location.reload(false);
		}
	}
}