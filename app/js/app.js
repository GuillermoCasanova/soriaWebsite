'use strict';

var app = (function(document, $) {
	var docElem = document.documentElement,
		_userAgentInit = function() {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		},
		_init = function() {
			$(document).foundation();
			_userAgentInit();
            $(function() {
                FastClick.attach(document.body);
            });
		};
	return {
		init: _init
	};
})(document, jQuery);

(function() {
	app.init();
})();


//Code to load html component of secondaryNav for services 
if($('#services-nav-container').length > 0) {
    $('#services-nav-container').load("components/nav--services.html");
};



$(document).on('ready', function() {

    //* Scroll Magic *//
    var controller = new ScrollMagic.Controller();


    // Pins section--pinned sections for natural wipe up 
    var slides = document.querySelectorAll(".section--pinned");
    // Create scene for every slide
    for (var i=0; i<slides.length; i++) {
        new ScrollMagic.Scene({
                triggerElement: slides[i],
                triggerHook: 'onLeave'
            })
            .setPin(slides[i])
            .addTo(controller);
    }


    $(function() {


        // Checks to see if required trigger is on page
        // Fixed Tab hidding/showing
        if($('.fixedTab').length > 0 && $("[data-action='show-fixedTab']").length > 0) {

            new ScrollMagic.Scene({triggerElement: "[data-action='show-fixedTab']"})
                            .setClassToggle('.fixedTab', 'is-visible')
                            .addTo(controller); 
        }

        //Checks to see if required trigger is on page
        if($('#services').length > 0) {
            // Sevices - Tween 
            var tween = TweenMax.staggerFrom('#services .enter-from-bottom', .4, {
                    opacity: 0,
                    y: 300

            }, 0.2); 

            // Services - Scene
            var scene = new ScrollMagic.Scene({
                        triggerElement: "#services",
                        reverse: false
            }).setTween(tween).addTo(controller);    

        }

        //Checks to see if required trigger is available for scrolling 
        if($("#header-fadeIn").length > 0) {

            // Header - Tween 
               var headerFadeIn = TweenMax.staggerFromTo('#header-fadeIn .enter-from-bottom', .4, 
                    {opacity:0, y: 300}, 
                    {opacity: 1, y: 0},
                     0.2); 

            // Header - Scene
            var scene = new ScrollMagic.Scene({
                        triggerElement: "#header-fadeIn",
                        reverse: false
            }).setTween(headerFadeIn).addTo(controller);    

        }


        //Checks to see if required trigger is available for scrolling 
        if($("#characteristics").length > 0) {

            // Characteristics - Tween 
            var fadeIn = TweenMax.staggerTo('.fade-in', 0.5, {
                    opacity: 1
            }, 0.6);

            // Characteristics - Scene
            var characteristics = new ScrollMagic.Scene({
                    triggerElement: "#characteristics",
                    reverse: false
            }).setTween(fadeIn).addTo(controller); 
        }


        //Checks to see if required trigger is available for scrolling 
        if($(".list-fadeIn").length > 0) {

            // List 1 - Tween 
            var fadeIn = TweenMax.staggerTo('.fadeIn', 0.6, {
                    opacity: 1
            }, 0.2);

            // List 1 - Scene
            var listFadeIn = new ScrollMagic.Scene({
                    triggerElement: ".list-fadeIn",
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

                    controller.scrollTo(id); 
                        // if supported by the browser we can even update the URL.
                    if (window.history && window.history.pushState) {
                        history.pushState("", document.title, id);
                    }
                }
            });
        }


        // Fixed navigation indicators of corresponding section 
        // Checks to see if required trigger is available for scrolling
        if($('.secondaryNav--fixed').length > 0) {

            // Gets the navigation for use when creating scenes  
            var fixedNav = $('.secondaryNav--fixed');

            // Gets all links in order to create scenes for each one
            var sections = document.querySelectorAll("a.smoothScroll");

            // Create scene for every section link 
            for (var i=0, l = sections.length; i < l; i++) { 

                //Gets the section id's from the links in the secondaryNav--fixed list 
                var section = $(sections[i]).attr("href");

                //Gets the height of the correspnding section 
                var sectionHeight = $(section).height(); 

                new ScrollMagic.Scene({
                        triggerElement: section,
                        duration: sectionHeight
                    })
                    .setClassToggle(section + "-anchor", "active") 
                    .addTo(controller);
            }
        };


    });
    

    //Blur Effect for Hero Header 
    $(window).on('scroll', function() {
        var blurImg = $(".blur");
        var oVal = $(window).scrollTop() / 240;
        blurImg.css("opacity", oVal);
    });



    //Animation for flip-containers to active on click 
    $('.flip-container').on('click  ontouchstart', function(e){
        e.stopPropagation();
        $(this).toggleClass('is-selected');
    });

    // Code for profiles to show bios on click 
    $('[data-action="toggle-profile-bio"]').on('click', function(e) {
        var bioProfile = $(this).parents('.profile');
        e.stopPropagation(); 
        e.preventDefault();
        bioProfile.toggleClass('is-showing'); 
    });

    // Code for showing/hiding map on Contact Page
    $('[data-action="toggle-map"]').on('click', function(e) {
        e.stopPropagation(); 
        e.preventDefault();
        // Stores the fixed tab dom element
        var fixedTab = $('.map-toggleButton'); 
        $('.section-bg--map').toggleClass('is-visible'); 
        $('.map-cover').toggleClass('is-hidden'); 
        $('[data-ui-component="contact-info"]').toggleClass('is-hidden'); 
        // Makes the tab to back to contact info visible 
        if(fixedTab.hasClass('is-visible')) {
              fixedTab.toggleClass('is-visible'); 
        } else {
           setTimeout(function() {
              fixedTab.toggleClass('is-visible'); 
            }, 500)         
        }

    });



    // Checks to see if there is a top-bar-container to hide/show
    // Essentially prevents it from working on small devices. 
    if($('.top-bar-container').length > 0) {

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

});


// Code for Contact Form 
$(function() {
    
    var form = $('#contact-form'); 

    var formMessages = $('#form-message');

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
