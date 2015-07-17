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


$(document).on('ready', function() {

    //* Scroll Magic *//
    var controller = new ScrollMagic.Controller();

    $(function() {

        // Checks to see if required trigger is on page
        if($('#scene').length > 0) {
            // Sevices - Tween 
               var tween = TweenMax.staggerFrom('.enter-in', .5, {
                    opacity: 0,
                    y: 300

            }, 0.3); 

            // Services - Scene
            var scene = new ScrollMagic.Scene({
                        triggerElement: "#scene",
                        reverse: false
            }).setTween(tween).addTo(controller);    

        }

        if($("#header-fadeIn").length > 0) {

            // Header - Tween 
               var headerFadeIn = TweenMax.staggerFrom('.header-enter-in', .5, {
                    opacity: 0,
                    y: 300

            }, 0.3); 

            // Header - Scene
            var scene = new ScrollMagic.Scene({
                        triggerElement: "#header-fadeIn",
                        reverse: false
            }).setTween(headerFadeIn).addTo(controller);    

        }

        if($("#characteristics").length > 0) {

            // Characteristics - Tween 
            var fadeIn = TweenMax.staggerFrom('.fade-in', 0.5, {
                    opacity: 0
            }, 1);

            // Characteristics - Scene
            var characteristics = new ScrollMagic.Scene({
                    triggerElement: "#characteristics"
            }).setTween(fadeIn).addTo(controller); 
        }


        if($("#list-fadeIn").length > 0) {

            // Characteristics - Tween 
            var fadeIn = TweenMax.staggerFrom('.fade-in', 0.2, {
                    opacity: 0
            }, 0.2);

            // Characteristics - Scene
            var characteristics = new ScrollMagic.Scene({
                    triggerElement: "#list-fadeIn",
                    reverse: false
            }).setTween(fadeIn).addTo(controller); 
        }


        if($("#list-fadeIn").length > 0) {

            // Characteristics - Tween 
            var fadeIn = TweenMax.staggerFrom('.fade-in', 0.2, {
                    opacity: 0
            }, 0.2);

            // Characteristics - Scene
            var characteristics = new ScrollMagic.Scene({
                    triggerElement: "#list-fadeIn",
                    reverse: false
            }).setTween(fadeIn).addTo(controller); 
        }

        //Checks to see if required trigger is available for scrolling 
        if($('.smoothScroll').length > 0) {
            // Anchor Smooth Scrolling - Scene 
            var scene = new ScrollMagic.Scene({triggerElement: ".secondaryNav", duration: 200, triggerHook: "onLeave"})
                            .addTo(controller);

            // Tells Controller to smoothly go to position with TweenMax
            controller.scrollTo(function (newpos) {
                TweenMax.to(window, 0.5, {scrollTo: {y: newpos}});
            });

            // Bing scroll animation to links with .smoothScroll class
            $(document).on("click", ".smoothScroll", function (e) {
                var id = $(this).attr("href");
                if ($(id).length > 0) {
                    e.preventDefault();

                    // trigger scroll
                    controller.scrollTo(id);

                        // if supported by the browser we can even update the URL.
                    if (window.history && window.history.pushState) {
                        history.pushState("", document.title, id);
                    }
                }
            });
        }



    });


    //Code for blur effect scroll 
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
    $('.flip-container').on('click', function(){
        event.stopPropagation();
        $(this).toggleClass('hover');
    });

    // Code for profiles to show bios on click 
    $('.profile-bio-toggle').on('click', function(e) {
        $(this).parents('.profile').toggleClass('is-showing'); 
    });

   // ontouchstart="this.classList.toggle('hover');

    //Binds blur effect to scroll
    //TODO: Optimize this method for medium effect to prevent lag 
    //$(document).on('scroll', fader); 

    (function($){

        var prevScroll = 0;
        var currentScroll; 
        var navBar = $('.top-bar-container');
        var navBarHeight = navBar.height(); 
        var didScroll = false; 
        var theWindow = $(window);
        var offSet = 200; 

        $(window).scroll(function() {
            didScroll = true;
        });
         
        setInterval(function() {
            if ( didScroll) {

                didScroll = false;

                currentScroll = theWindow.scrollTop();


                if (currentScroll < navBarHeight) {
                    navBar.removeClass('is-alt'); 
                }

                //Shows Navigation Bar when user starts scrolling up 
                if( currentScroll < prevScroll ) {
                    navBar.removeClass('is-hidden'); 
                    navBar.addClass('is-fixed');
                }

                if(currentScroll > prevScroll) {
                    navBar.removeClass('is-fixed'); 
                    navBar.addClass('is-hidden');
                }

                if(navBar.hasClass('is-fixed') && currentScroll > navBarHeight) {
                    navBar.addClass('is-alt'); 
                }

               prevScroll = currentScroll;

            }

        }, 300);

    })(jQuery);

});


