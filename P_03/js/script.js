function BarAnimation() {
  document.getElementById('progress_bar_html').classList.add('bar_html');
  document.getElementById('progress_bar_ps').classList.add('bar_ps');
  document.getElementById('progress_bar_pp').classList.add('bar_pp');
  document.getElementById('progress_bar_bootstrap').classList.add('bar_bootstrap');
  document.getElementById('progress_bar_cms').classList.add('bar_cms');
}

// Check si l'element passé en param est affiché sur l'écran
function checkVisible(elm) {
  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

//Regarde si la div competence est affichée toutes les 250ms puis désactive l'interval
var interval = setInterval(function() {
    if ( checkVisible(document.getElementById('competences')))     {
        BarAnimation();
        clearInterval(interval); // Désactive le SetInterval
    }
}, 250);


var piesiteFired = 0;
$(document).ready(function() {
    var $win = $(window),
        $win_height = $(window).height(),
        // - A multiple of viewport height - The higher this number the sooner triggered.
        windowPercentage = $(window).height() * 0.9;
    $win.on("scroll", scrollReveal);
    function scrollReveal() {
        var scrolled = $win.scrollTop();

        ///////////////////////////////////////
        // Bar Charts scroll activate, looking for .trigger class to fire.
        $(".trigger").each(function() {
            var $this = $(this),
                offsetTop = $this.offset().top;
            if (
                scrolled + windowPercentage > offsetTop ||
                $win_height > offsetTop
            ) {
                $(this).each(function(key, bar) {
                    var percentage = $(this).data("percentage");
                    $(this).css("height", percentage + "%");

                    ///////////////////////////////////////
                    //        Animated numbers
                    $(this).prop("Counter", 0).animate(
                        {
                            Counter: $(this).data("percentage")
                        },
                        {
                            duration: 2000,
                            easing: "swing",
                            step: function(now) {
                                $(this).text(Math.ceil(now));
                            }
                        }
                    );
                    //        Animated numbers
                    ///////////////////////////////////////
                });

            } else {
                ///////////////////////////////////////
                // To keep them triggered, lose this block.
                $(this).each(function(key, bar) {
                    $(this).css("height", 0);
                });
            }

        });

        ///////////////////////////////////////
        // Horizontal Chart
        $(".chartBarsHorizontal .bar").each(function() {
            var $this = $(this),
                offsetTop = $this.offset().top;
            if (
                scrolled + windowPercentage > offsetTop ||
                $win_height > offsetTop
            ) {
                $(this).each(function(key, bar) {
                    var percentage = $(this).data("percentage");
                    $(this).css("width", percentage + "%");
                    ///////////////////////////////////////
                    //        Animated numbers
                    $(this).prop("Counter", 0).animate(
                        {
                            Counter: $(this).data("percentage")
                        },
                        {
                            duration: 2000,
                            easing: "swing",
                            step: function(now) {
                                $(this).text(Math.ceil(now));
                            }
                        }
                    );
                    //        Animated numbers
                    ///////////////////////////////////////
                });

            } else {
                ///////////////////////////////////////
                // To keep them triggered, lose this block.
                $(this).each(function(key, bar) {
                    $(this).css("width", 0);
                });
            }

        });

    }
    scrollReveal();
});
