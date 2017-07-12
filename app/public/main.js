$(document).ready(function() {

    //Animation CSS default constructor

    $.fn.extend({
        animateCss: function(animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });

    $('.clearfix,footer').animateCss('bounceInLeft')
    $('.jumbotron').animateCss('bounceInUp')


    $('.btn').mouseover(function() {
        $(this).animateCss('swing');
    });


});