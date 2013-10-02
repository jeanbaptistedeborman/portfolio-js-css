/**
@author : Jean-Baptiste de Borman - jb@noloading.com

Various tools (could be better documented or organised).  

**/

//Dev tool:Wrapper of console.log in order to avoidall risk of breaking IE. 
function trace(string) {

	if ( typeof (console) !== "undefined" && console.log !== undefined) {
		try {
			console.log.apply(console, arguments);
		} catch (e) {
		}
	}
}


var ArrayTools = {
	
	/**
	Tests if an object is in array; 
	@param {Array} array : the array to be tested
	@param {Object} obj : the object to be tested
	@param {Boolean} $object_bool : specifies if the object is a JQUERY object. 
	@return {Boolean} : true if the object is in array. 
	**/
	  
	contains : function(array, obj, $object_bool) {
		var contains_bool = false;
		for (var n in array) {
			var el1 = array[n];
			var el2 = obj;

			if ($object_bool) {
				el1 = el1[0];
				el2 = el2[0];

			}
			if (el1 === el2) {
				contains_bool = true;
				break;
			}
		}
		return (contains_bool);

	}
}




//Various user agent analysis
var UserAgent = {
	android : function() {
		return navigator.userAgent.match(/Android/i) ? true : false;
	},
	blackBerry : function() {
		return navigator.userAgent.match(/BlackBerry/i) ? true : false;
	},
	iOS : function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
	},
	windows : function() {
		return navigator.userAgent.match(/IEMobile/i) ? true : false;
	},
	mobileWebkit : function() {
		return (isMobile.Android() || isMobile.iOS());

	},

	iPhone : function() {

		if (this.iOS) {

			return navigator.userAgent.match(/iPhone/i) ? true : false;

		}
	},

	anyMobile : function() {
		return (isMobile.android() || isMobile.blackBerry() || isMobile.iOS() || isMobile.windows())
	},

	msie : function() {
		return this._getInternetExplorerVersion();

	},
	_getInternetExplorerVersion : function()
	{
		var rv = -1// Return value assumes failure.
		if (navigator.appName == 'Microsoft Internet Explorer') {
			var ua = navigator.userAgent;
			var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) != null)
				rv = parseFloat(RegExp.$1);
		}
		return rv;
	}
};


//Test of Touch device
var isTouch = function() {

	return (Modernizr.touch);

}


//test for screens
var ScreenTools = {
	
	isPortrait : function() {

		return window.innerWidth < window.innerHeight;

	}
}

//Array manipulation




