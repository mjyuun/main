
$(function() {
$('body').hide().fadeIn('slow');
});

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 600);
        return false;
      }
    }
  });
});

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }

    lastScrollTop = st;
}


//onscroll fadeIn//
$(document).ready(function() {

    /* Every time the window is scrolled ... */
    $(window).scroll( function(){

        /* Check the location of each desired element */
        $('.hideme').each( function(i){

            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object ){

                $(this).animate({'opacity':'1'},400);

            }

        });

    });

});

$(document).ready(function() {
          $('.about_img').delay(3000).animate({bottom:"15%"},600);
    });


/* http://nanobar.micronube.com/  ||  https://github.com/jacoborus/nanobar/    MIT LICENSE */
    (function (root) {
      'use strict'
      // container styles
      var css = '.nanobar{width:100%;height:4px;z-index:9999;top:0}.bar{width:0;height:100%;transition:height .3s;background:#000}'

      // add required css in head div
      function addCss () {
        var s = document.getElementById('nanobarcss')

        // check whether style tag is already inserted
        if (s === null) {
          s = document.createElement('style')
          s.type = 'text/css'
          s.id = 'nanobarcss'
          document.head.insertBefore(s, document.head.firstChild)
          // the world
          if (!s.styleSheet) return s.appendChild(document.createTextNode(css))
          // IE
          s.styleSheet.cssText = css
        }
      }

      function addClass (el, cls) {
        if (el.classList) el.classList.add(cls)
        else el.className += ' ' + cls
      }

      // create a progress bar
      // this will be destroyed after reaching 100% progress
      function createBar (rm) {
        // create progress element
        var el = document.createElement('div'),
            width = 0,
            here = 0,
            on = 0,
            bar = {
              el: el,
              go: go
            }

        addClass(el, 'bar')

        // animation loop
        function move () {
          var dist = width - here

          if (dist < 0.1 && dist > -0.1) {
            place(here)
            on = 0
            if (width >= 100) {
              el.style.height = 0
              setTimeout(function () {
                rm(el)
              }, 300)
            }
          } else {
            place(width - dist / 4)
            setTimeout(go, 16)
          }
        }

        // set bar width
        function place (num) {
          width = num
          el.style.width = width + '%'
        }

        function go (num) {
          if (num >= 0) {
            here = num
            if (!on) {
              on = 1
              move()
            }
          } else if (on) {
            move()
          }
        }
        return bar
      }

      function Nanobar (opts) {
        opts = opts || {}
        // set options
        var el = document.createElement('div'),
            applyGo,
            nanobar = {
              el: el,
              go: function (p) {
                // expand bar
                applyGo(p)
                // create new bar when progress reaches 100%
                if (p >= 100) {
                  init()
                }
              }
            }

        // remove element from nanobar container
        function rm (child) {
          el.removeChild(child)
        }

        // create and insert progress var in nanobar container
        function init () {
          var bar = createBar(rm)
          el.appendChild(bar.el)
          applyGo = bar.go
        }

        addCss()

        addClass(el, 'nanobar')
        if (opts.id) el.id = opts.id
        if (opts.classname) addClass(el, opts.classname)

        // insert container
        if (opts.target) {
          // inside a div
          el.style.position = 'relative'
          opts.target.insertBefore(el, opts.target.firstChild)
        } else {
          // on top of the page
          el.style.position = 'fixed'
          document.getElementsByTagName('body')[0].appendChild(el)
        }

        init()
        return nanobar
      }

      if (typeof exports === 'object') {
        // CommonJS
        module.exports = Nanobar
      } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], function () { return Nanobar })
      } else {
        // Browser globals
        root.Nanobar = Nanobar
      }
    }(this))


    var nanobar = new Nanobar( "#nanobar" );

    var options = {
    	classname: 'my-class',
      id: 'my-id',
    	target: document.getElementById('myDivId')
    };

    var nanobar = new Nanobar( options );

    //move bar
    nanobar.go( 30 ); // size bar 30%
    nanobar.go( 76 ); // size bar 76%

    // size bar 100% and and finish
    nanobar.go(100);
