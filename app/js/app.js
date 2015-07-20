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


$(document).on('ready', function() {

    //* Scroll Magic *//
    var controller = new ScrollMagic.Controller();


    // get all slides
    var slides = document.querySelectorAll(".section--pinned");
    // create scene for every slide
    for (var i=0; i<slides.length; i++) {
        new ScrollMagic.Scene({
                triggerElement: slides[i],
                triggerHook: 'onLeave'
            })
            .setPin(slides[i])
            .addTo(controller);
    }



    $(function() {

        //Checks to see if required trigger is on page
        if($('#scene').length > 0) {
            // Sevices - Tween 
               var tween = TweenMax.staggerFrom('.enter-in', .4, {
                    opacity: 0,
                    y: 300

            }, 0.2); 

            // Services - Scene
            var scene = new ScrollMagic.Scene({
                        triggerElement: "#scene",
                        reverse: false
            }).setTween(tween).addTo(controller);    

        }


        //Checks to see if required trigger is available for scrolling 
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


        //Checks to see if required trigger is available for scrolling 
        if($("#characteristics").length > 0) {

            // Characteristics - Tween 
            var fadeIn = TweenMax.staggerFrom('.fade-in', 0.5, {
                    opacity: 0
            }, 0.6);

            // Characteristics - Scene
            var characteristics = new ScrollMagic.Scene({
                    triggerElement: "#characteristics",
                    reverse: false
            }).setTween(fadeIn).addTo(controller); 
        }


        //Checks to see if required trigger is available for scrolling 
        if($("#list-fadeIn").length > 0) {

            // List 1 - Tween 
            var fadeIn = TweenMax.staggerFrom('.fade-in', 0.2, {
                    opacity: 0
            }, 0.2);

            // List 1 - Scene
            var listFadeIn = new ScrollMagic.Scene({
                    triggerElement: "#list-fadeIn",
                    duration: 400, 
                    reverse: false
            }).setTween(fadeIn).addTo(controller);
        }

        //Checks to see if required trigger is available for scrolling 
        if($("#list-fadeIn2").length > 0) {

            // List 2 - Tween 
            var fadeIn2 = TweenMax.staggerFrom('.fade-in2', 0.2, {
                    opacity: 0
            }, 0.2)

            // List 2 - Scene
            var listFadeIn2 = new ScrollMagic.Scene({
                    triggerElement: "#list-fadeIn2",
                    duration: 400, 
                    reverse: false
            }).setTween(fadeIn2).addTo(controller);
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
    

    //Blur Effect for Hero Header 

    $(window).on('scroll', function() {
        var blurImg = $(".blur");
        var oVal = $(window).scrollTop() / 240;
        blurImg.css("opacity", oVal);
    });



    //Animation for flip-containers to active on click 
    $('.flip-container').on('click  ontouchstart', function(e){
        e.stopPropagation();
        e.preventDefault();
        $(this).toggleClass('hover');
    });

    // Code for profiles to show bios on click 
    $('[data-action="toggle-profile-bio"]').on('click', function(e) {
        var bioProfile = $(this).parents('.profile');
        e.stopPropagation(); 
        e.preventDefault();
        bioProfile.toggleClass('is-showing'); 
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




// //Plugin for Smooth Scrolling Like Firefox 
// function ssc_init() {
//     if (!document.body) return;
//     var e = document.body;
//     var t = document.documentElement;
//     var n = window.innerHeight;
//     var r = e.scrollHeight;

//     ssc_root = document.compatMode.indexOf("CSS") >= 0 ? t : e;
//     ssc_activeElement = e;
//     ssc_initdone = true;

//     if (top != self)
//         ssc_frame = true;

//     else if (r > n && (e.offsetHeight <= n || t.offsetHeight <= n)) {
//         ssc_root.style.height = "auto";
//         if (ssc_root.offsetHeight <= n) {
//             var i = document.createElement("div");
//             i.style.clear = "both";
//             e.appendChild(i)
//         }
//     }

//     if (!ssc_fixedback) {
//         e.style.backgroundAttachment = "scroll";
//         t.style.backgroundAttachment = "scroll"
//     }

//     if (ssc_keyboardsupport)
//         ssc_addEvent("keydown", ssc_keydown);
// }

// function ssc_scrollArray(e, t, n, r) {
//     r || (r = 1e3);
//     ssc_directionCheck(t, n);
//     ssc_que.push({
//         x: t,
//         y: n,
//         lastX: t < 0 ? .99 : -.99,
//         lastY: n < 0 ? .99 : -.99,
//         start: +(new Date)
//     });

//     if (ssc_pending)
//         return;

//     var i = function () {
//         var s = +(new Date);
//         var o = 0;
//         var u = 0;
//         for (var a = 0; a < ssc_que.length; a++) {
//             var f = ssc_que[a];
//             var l = s - f.start;
//             var c = l >= ssc_animtime;
//             var h = c ? 1 : l / ssc_animtime;
//             if (ssc_pulseAlgorithm) {
//                 h = ssc_pulse(h)
//             }
//             var p = f.x * h - f.lastX >> 0;
//             var d = f.y * h - f.lastY >> 0;
//             o += p;
//             u += d;
//             f.lastX += p;
//             f.lastY += d;
//             if (c) {
//                 ssc_que.splice(a, 1);
//                 a--
//             }
//         }
//         if (t) {
//             var v = e.scrollLeft;
//             e.scrollLeft += o;
//             if (o && e.scrollLeft === v) {
//                 t = 0
//             }
//         }
//         if (n) {
//             var m = e.scrollTop;
//             e.scrollTop += u;
//             if (u && e.scrollTop === m) {
//                 n = 0
//             }
//         }
//         if (!t && !n)
//             ssc_que = [];

//         if (ssc_que.length)
//             setTimeout(i, r / ssc_framerate + 1);
//         else
//             ssc_pending = false;
//     };
//     setTimeout(i, 0);
//     ssc_pending = true
// }

// function ssc_wheel(e) {
//     if (!ssc_initdone) {
//         ssc_init()
//     }
//     var t = e.target;
//     var n = ssc_overflowingAncestor(t);
//     if (!n || e.defaultPrevented || ssc_isNodeName(ssc_activeElement, "embed") || ssc_isNodeName(t, "embed") && /\.pdf/i.test(t.src)) {
//         return true
//     }
//     var r = e.wheelDeltaX || 0;
//     var i = e.wheelDeltaY || 0;
//     if (!r && !i)
//         i = e.wheelDelta || 0;

//     if (Math.abs(r) > 1.2)
//         r *= ssc_stepsize / 120;

//     if (Math.abs(i) > 1.2)
//         i *= ssc_stepsize / 120;

//     ssc_scrollArray(n, -r, -i);
//     e.preventDefault()
// }

// function ssc_keydown(e) {
//     var t = e.target;
//     var n = e.ctrlKey || e.altKey || e.metaKey;

//     if (/input|textarea|embed/i.test(t.nodeName) || t.isContentEditable || e.defaultPrevented || n)
//         return true;

//     if (ssc_isNodeName(t, "button") && e.keyCode === ssc_key.spacebar)
//         return true;

//     var r, i = 0,
//         s = 0;
//     var o = ssc_overflowingAncestor(ssc_activeElement);
//     var u = o.clientHeight;

//     if (o == document.body)
//         u = window.innerHeight;

//     switch (e.keyCode) {
//         case ssc_key.up:
//             s = -ssc_arrowscroll;
//             break;
//         case ssc_key.down:
//             s = ssc_arrowscroll;
//             break;
//         case ssc_key.spacebar:
//             r = e.shiftKey ? 1 : -1;
//             s = -r * u * .9;
//             break;
//         case ssc_key.pageup:
//             s = -u * .9;
//             break;
//         case ssc_key.pagedown:
//             s = u * .9;
//             break;
//         case ssc_key.home:
//             s = -o.scrollTop;
//             break;
//         case ssc_key.end:
//             var a = o.scrollHeight - o.scrollTop - u;
//             s = a > 0 ? a + 10 : 0;
//             break;
//         case ssc_key.left:
//             i = -ssc_arrowscroll;
//             break;
//         case ssc_key.right:
//             i = ssc_arrowscroll;
//             break;
//         default:
//             return true
//     }
//     ssc_scrollArray(o, i, s);
//     e.preventDefault()
// }

// function ssc_mousedown(e) {
//     ssc_activeElement = e.target
// }

// function ssc_setCache(e, t) {
//     for (var n = e.length; n--;) ssc_cache[ssc_uniqueID(e[n])] = t;
//     return t
// }

// function ssc_overflowingAncestor(e) {
//     var t = [];
//     var n = ssc_root.scrollHeight;
//     do {
//         var r = ssc_cache[ssc_uniqueID(e)];
//         if (r) {
//             return ssc_setCache(t, r)
//         }
//         t.push(e);
//         if (n === e.scrollHeight) {
//             if (!ssc_frame || ssc_root.clientHeight + 10 < n) {
//                 return ssc_setCache(t, document.body)
//             }
//         } else if (e.clientHeight + 10 < e.scrollHeight) {
//             overflow = getComputedStyle(e, "").getPropertyValue("overflow");
//             if (overflow === "scroll" || overflow === "auto") {
//                 return ssc_setCache(t, e)
//             }
//         }
//     }
//     while (e = e.parentNode)
// }

// function ssc_addEvent(e, t, n) {
//     window.addEventListener(e, t, n || false)
// }

// function ssc_removeEvent(e, t, n) {
//     window.removeEventListener(e, t, n || false)
// }

// function ssc_isNodeName(e, t) {
//     return e.nodeName.toLowerCase() === t.toLowerCase()
// }

// function ssc_directionCheck(e, t) {
//     e = e > 0 ? 1 : -1;
//     t = t > 0 ? 1 : -1;
//     if (ssc_direction.x !== e || ssc_direction.y !== t) {
//         ssc_direction.x = e;
//         ssc_direction.y = t;
//         ssc_que = []
//     }
// }

// function ssc_pulse_(e) {
//     var t, n, r;
//     e = e * ssc_pulseScale;
//     if (e < 1) {
//         t = e - (1 - Math.exp(-e))
//     } else {
//         n = Math.exp(-1);
//         e -= 1;
//         r = 1 - Math.exp(-e);
//         t = n + r * (1 - n)
//     }
//     return t * ssc_pulseNormalize
// }

// function ssc_pulse(e) {
//     if (e >= 1) return 1;
//     if (e <= 0) return 0;
//     if (ssc_pulseNormalize == 1) {
//         ssc_pulseNormalize /= ssc_pulse_(1)
//     }
//     return ssc_pulse_(e)
// }

// var ssc_framerate = 150;
// var ssc_animtime = 500;
// var ssc_stepsize = 150;
// var ssc_pulseAlgorithm = true;
// var ssc_pulseScale = 6;
// var ssc_pulseNormalize = 1;
// var ssc_keyboardsupport = true;
// var ssc_arrowscroll = 50;
// var ssc_frame = false;
// var ssc_direction = {
//     x: 0,
//     y: 0
// };
// var ssc_initdone = false;
// var ssc_fixedback = true;
// var ssc_root = document.documentElement;
// var ssc_activeElement;
// var ssc_key = {
//     left: 37,
//     up: 38,
//     right: 39,
//     down: 40,
//     spacebar: 32,
//     pageup: 33,
//     pagedown: 34,
//     end: 35,
//     home: 36
// };
// var ssc_que = [];
// var ssc_pending = false;
// var ssc_cache = {};

// setInterval(function () {
//     ssc_cache = {}
// }, 10 * 1e3);

// var ssc_uniqueID = function () {
//     var e = 0;
//     return function (t) {
//         return t.ssc_uniqueID || (t.ssc_uniqueID = e++)
//     }
// }();

// var ischrome = /chrome/.test(navigator.userAgent.toLowerCase());
// if (ischrome) {
//     ssc_addEvent("mousedown", ssc_mousedown);
//     ssc_addEvent("mousewheel", ssc_wheel);
//     ssc_addEvent("load", ssc_init)
// }



