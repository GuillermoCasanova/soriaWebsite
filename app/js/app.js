'use strict';

var app = (function(document, $) {

	var docElem = document.documentElement,

        // Defines client's devices on the <html> element's data-useragent attr
		_userAgentInit = function() {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		},

		_init = function() {
            // Initializes Foundation
			$(document).foundation();
			_userAgentInit();
            // Initializes fast click on the document
            $(function() {
                FastClick.attach(document.body);
            });
            // Initializes back to top button
            initBackToTopButton(); 

		};

	return {
		init: _init
	};

})(document, jQuery);


(function() {
	app.init();
})();






/*------------------------------------*\
    #Loading services side nav from components/nav--services.html
\*------------------------------------*/

if($("[data-action='load-services-side-nav']").length > 0) {

    $("[data-action='load-services-side-nav']").load('components/nav--services.html');
};

if($("[data-action='load-footer']").length > 0) {
    $("[data-action='load-footer']").load('components/footer.html')
}




$(document).on('ready', function() {


    /*------------------------------------*\
        #Scroll Magic
    \*------------------------------------*/

    // Defines the Scrollmagic controller to contain all scenes
    var controller = new ScrollMagic.Controller();


    // Checks if there is a section--pinned to pin and it is not a touch device
    // Removing the "pin" effect on touch devices avoids bugs with event being binded to scroll
    if($('[data-action="pin-element-to-top"]') && !$('html').hasClass('touch')) {

          // Pins section--pinned sections for natural wipe up 
        var slides = document.querySelectorAll('[data-action="pin-element-to-top"]');
        // Create scene for every slide
        for (var i=0; i<slides.length; i++) {
            new ScrollMagic.Scene({
                    triggerElement: slides[i],
                    triggerHook: 'onLeave'
                })
                .setPin(slides[i])
                .addTo(controller);
        }
      
    }

    /*------------------------------------*\
        #Scroll animations on index.html page 
    \*------------------------------------*/


    //Checks to see if required trigger is on page
    if($("[data-action='bring-in-services']").length > 0) {
        // Sevices - Tween 
         var enterFromBottom = TweenMax.staggerFromTo('#services .enter-from-bottom', 0.6, 
                {opacity:0, y: 300}, 
                {opacity: 1, y: 0},
                 0.4); 

        // Services - Scene
        var scene = new ScrollMagic.Scene({
                    triggerElement: "[data-action='bring-in-services']",
                    reverse: false
        }).setTween(enterFromBottom).addTo(controller);    

    }


    // Checks to see if required trigger is available for scrolling 
    if($("[data-action='fade-in-characteristics']").length > 0) {

        // index.html Characteristics - Tween 
        var fadeIn = TweenMax.staggerTo('.fade-in', .6, {
                opacity: 1
        }, 0.4);

        // index.html Characteristics - Scene
        var characteristics = new ScrollMagic.Scene({
                triggerElement: "[data-action='fade-in-characteristics']",
                reverse: false
        }).setTween(fadeIn).addTo(controller); 
    }



    /*------------------------------------*\
        #Scroll animations on ccpa.html page 
    \*------------------------------------*/


    //Checks to see if required trigger is available for scrolling 
    if($("[data-action='bring-in-header']").length > 0) {

        // ccpa.html Header - Tween 
        var enterFromBottom = TweenMax.staggerFromTo('[data-action="bring-in-header"] .enter-from-bottom', 0.6, 
                {opacity:0, y: 300}, 
                {opacity: 1, y: 0},
                 0.4); 

        // ccpa.html Header - Scene
        var scene = new ScrollMagic.Scene({
                    triggerElement: "[data-action='bring-in-header']",
                    reverse: false
        }).setTween(enterFromBottom).addTo(controller);    

    }


    if($("[data-action='bring-in-biografia']").length > 0) {

        // ccpa.html Biografia - Tween 
        // has contents stagger fade in from the bottom 
       var enterFromBottom = TweenMax.staggerFromTo('#biografia .enter-from-bottom', 0.6, 
            {opacity:0, y: 300}, 
            {opacity: 1, y: 0},
             0.4); 

        // ccpa.html Biografia - Scene
        var scene = new ScrollMagic.Scene({
                    triggerElement: "[data-action='bring-in-biografia']",
                    reverse: false
        }).setTween(enterFromBottom).addTo(controller);    

    }


    // Checks to see if required trigger is available for scrolling 
    if($("[data-action='fade-in-list']").length > 0) {

        // ccpa.html List 1 - Tween 
        // has contents stagger fade in from the bottom 
        var fadeIn = TweenMax.staggerTo('#plan .fadeIn', 0.6, {
                opacity: 1
        }, 0.4);

        // ccpa.html List 1 - Scene
        var listFadeIn = new ScrollMagic.Scene({
                triggerElement: "[data-action='fade-in-list']",
                reverse: false
        }).setTween(fadeIn).addTo(controller);
    }



    /*------------------------------------*\
        #SmoothScroll for Nav links (ccpa.html page)
    \*------------------------------------*/


    // Checks to see if required trigger is available for scrolling 
    if($('[data-action="scroll-to-section"]').length > 0) {
        // Anchor Smooth Scrolling - Scene 
        var scene = new ScrollMagic.Scene({triggerElement: '[data-ui-component="smoothScroll-nav"]', duration: 200, triggerHook: "onLeave"})
                        .addTo(controller);

        // Tells Controller to smoothly go to position with TweenMax
        controller.scrollTo(function (newpos) {
            TweenMax.to(window, 0.6, {scrollTo: {y: newpos}});
        });

        // Bind scroll animation to links with .smoothScroll class
        $('[data-action="scroll-to-section"]').on("click", function (e) {
            var id = $(this).attr("href");
            if ($(id).length > 0) {
                e.preventDefault();

                controller.scrollTo(id); 
                    // if supported by the browser we can even update the URL.
                if (window.history && window.history.pushState) {
                    history.pushState("", document.title, id);
                }
            }
        });

        // Code below is for giving '[data-action="scroll-to-section"]' links the .active class
        // when on their respective sections

        // Gets all smoothScroll-links in order to create scenes for each one
        var sections = document.querySelectorAll('[data-ui-component="smoothScroll-link"]');

        // Create scene for every section link 
        for (var i=0, l = sections.length; i < l; i++) { 

            // Gets the section id's from the links in the secondaryNav--fixed list 
            var section = $(sections[i]).attr("href");

            // Gets the height of the corresponding section 
            // This is needed so the link maintains it's active class for the duration of the height
            var sectionHeight = $(section).height(); 

            // Gets li's of anchor links to give them the 'active' class 
            var anchorLink = $(section + "-anchor").parent().get(0);

            new ScrollMagic.Scene({
                    triggerElement: section,
                    duration: sectionHeight
                })
                .setClassToggle(anchorLink, "is-active") 
                .addTo(controller);
        }

    };


    /*------------------------------------*\
        #Smooth Fading Copy on pages  
    \*------------------------------------*/


    // Checks to see if required trigger is available for scrolling 
    if($("[data-action='fade-in-copy']").length > 0) {

        // Fade in Copy - Tween 
        var fadeInCopy = TweenMax.staggerTo('.fadeIn', 0.6, {
                opacity: 1
        }, 0.4);

        // Fade in Copy - Scene
        new ScrollMagic.Scene({
                triggerElement: "[data-action='fade-in-copy']",
                reverse: false
        }).setTween(fadeInCopy).addTo(controller);
    }


    /*------------------------------------*\
        #Toggle Fixed Tab 
    \*------------------------------------*/


    // Checks to see if required trigger is on page
    // Fixed Tab hidding/showing based on location of  [data-action='show-fixed-tab'] trigger
    if($("[data-ui-component='fixed-tab']").length > 0 && $("[data-action='show-fixed-tab']").length > 0) {

        new ScrollMagic.Scene({triggerElement: "[data-action='show-fixed-tab']"})
                        .setClassToggle("[data-ui-component='fixed-tab']", 'is-visible')
                        .addTo(controller); 
    }

    // End Scroll Magic Code 




    /*------------------------------------*\
        #Top Bar Slide in/out 
    \*------------------------------------*/

    // Checks to see if there is a '[data-action="toggle-top-bar"]' to hide/show
    // This prevents it from activating on small devices. 
    if($('[data-action="toggle-top-bar"]').length > 0) {

        (function($){

            var prevScroll = 0;
            var currentScroll; 
            var navBar = $('[data-action="toggle-top-bar"]');
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
                        setTimeout(function() {


                        }, 500);
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
    }



    /*------------------------------------*\
        #Lazy Load Images 
    \*------------------------------------*/


    $('[data-action="lazy-load-img"]').lazyload({
        threshold: 200, 
        effect: "fadeIn"
    });


    /*------------------------------------*\
        #Toggle Panel Flipping  (index.html)
    \*------------------------------------*/


    $('[data-action="flip-panel"]').on('click  ontouchstart  focus', function(e){
        e.stopPropagation();
        $(this).toggleClass('is-selected');
    });


    /*------------------------------------*\
        #Profiles Toggle  (index.html)
    \*------------------------------------*/


    $('[data-action="toggle-profile-bio"]').on('click  focus', function(e) {
        var bioProfile = $(this).parents('.profile');
        e.stopPropagation(); 
        e.preventDefault();
        bioProfile.toggleClass('is-showing'); 
    });


    /*------------------------------------*\
        #Contact Form/Map Toggle (contact.html)
    \*------------------------------------*/

    $('[data-action="toggle-map"]').on('click', function(e) {
        e.stopPropagation(); 
        e.preventDefault();

        // Stores the button
        var toggleMapButton = $('[data-ui-component="toggle-map-button"]'); 


        $('[data-ui-component="contact-info"]').toggleClass('is-hidden'); 


        // Hides or shows map and cover
        $('[data-ui-component="map"]').toggleClass('is-visible'); 
        $('[data-ui-component="map-cover"]').toggleClass('is-hidden'); 


        // Hides/Shows the toggleMapButton 

        if(toggleMapButton.hasClass('is-visible')) {

            toggleMapButton.toggleClass('is-visible'); 

        } else {

            // Have a delay before showing it so as to not distract the user when information hides 
            setTimeout(function() {

              toggleMapButton.toggleClass('is-visible'); 
            }, 600);   
       

        }

    });

});







/*------------------------------------*\
    #Processing Contact Form  
\*------------------------------------*/


$(function() {
    
    var form = $("[data-ui-component='contact-form']"); 

    var formMessages = $("[data-ui-component='form-message']");

    $(form).submit(function(e) {

        e.preventDefault(); 

        // Serializing data of the contact-form 
        var formData = $(form).serialize(); 
        
        // Submit the content using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        }).done(function() {
            $(formMessages).toggleClass('is-visible'); 
            $(form).addClass('is-hidden'); 

            $('#name').val('');
            $('#email').val('');
            $('#messages').val(''); 


        }).fail(function(data) {
            // Set the message text
            if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('An error occured and your message could not be sent. Please try again in a few seconds.');
                }
            });
        })

});  





/*------------------------------------*\
    #Back to top Button
\*------------------------------------*/


function initBackToTopButton() {

    $('[data-action="go-to-top"]').on('click', function() {

        $("body, html").animate({
            scrollTop: 0
        }, 800)

        return false;

    }); 
};



