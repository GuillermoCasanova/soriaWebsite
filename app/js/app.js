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


//Code for blur effect scroll 
$(document).on('ready', function() {


    var controller = new ScrollMagic.Controller();

    $(function() {


        //Tweens/Animations
        var tween = TweenMax.staggerFrom('.enter-in', 3, {
                opacity: 0
        }, 2); 


        //ScrollMagic Scenes
        var scene = new ScrollMagic.Scene({
                    triggerElement: "#scene",
                    duration: 250
        }).setTween(tween).addTo(controller); 


    });


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


    //Animation for flip-containers to active on click 
    $('.flip-container').on('click  ontouchstart', function(){
        $(this).toggleClass('hover');
    });

   // ontouchstart="this.classList.toggle('hover');

    //Binds blur effect to scroll
    //TODO: Optimize this method for medium effect to prevent lag 
    $(document).on('scroll', fader); 

    // (function($){

    //     var prevScroll = 0;
    //     var currentScroll; 
    //     var navBar = $('.header');
    //     var navBarHeight = navBar.height(); 
    //     var didScroll = false; 
    //     var theWindow = $(window);
    //     var offset = 800; 

    //     $(window).scroll(function() {
    //         didScroll = true;
    //     });
         
    //     setInterval(function() {
    //         if ( didScroll) {

    //             didScroll = false;

    //             currentScroll = theWindow.scrollTop();

    //             if (currentScroll > navBarHeight + 1000) {
    //                 navBar.addClass('is-alt');
    //             }
    //             if (currentScroll < navBarHeight) {
    //                 navBar.removeClass('is-alt'); 
    //             }

    //             if( (currentScroll  + offset) < prevScroll || currentScroll < navBarHeight) {
    //                 navBar.removeClass('is-hidden'); 
    //                 navBar.addClass('is-fixed');
    //             }
    //             if(currentScroll > prevScroll) {
    //                 navBar.removeClass('is-fixed'); 
    //                 navBar.addClass('is-hidden'); 
    //             }

    //            prevScroll = currentScroll;

    //         }

    //         // if(theWindow.scrollTop() === 0) {
    //         //     navBar.removeClass('fixed'); 
    //         // }

    //     }, 300);

    // })(jQuery);

});



//Code for hiding navigation bar


