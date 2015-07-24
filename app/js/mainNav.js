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
