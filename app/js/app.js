'use strict';

var app = (function(document, $) {
	var docElem = document.documentElement,
		_userAgentInit = function() {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		},
		_init = function() {
			$(document).foundation();
            // needed to use joyride
            // doc: http://foundation.zurb.com/docs/components/joyride.html
            $(document).on('click', '#start-jr', function () {
                $(document).foundation('joyride', 'start');
            });
			_userAgentInit();
		};
	return {
		init: _init
	};
})(document, jQuery);

(function() {
	app.init();
})();
'use strict';



//Code for blur effect scroll 
$(document).on('ready', function() {

    function fader() {

        var r = $('.blurred'),
            wh = $(window).height(),
            dt = $(document).scrollTop(), 
            elView, 
            opacity; 

            //Loop ELements with class "blurred"
            r.each(function() {

                elView = wh - ($(this).offset().top - dt + 200);

                //Top of Div above bottom window
                if(elView > 0) { 

                    opacity = 1 / (wh + $(this).height()) * elView * 2;

                    if(opacity < 1) {
                        $(this).css('opacity', opacity); 
                    }
                }

                if($(document).scrollTop() === 0) {
                    $(this).css('opacity', 0); 
                }


            });

       

    }

    //Binds blur effect to scroll
    $(document).bind('scroll', fader); 

});

