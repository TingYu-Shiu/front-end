$(document).ready(function () {

    $('.top a').click(function (e) { 
        e.preventDefault();
        $('html, body').animate({scrollTop:0},3000);
        
      });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {$('.top').fadeIn();} 
        else {$('.top').fadeOut();}
    });

    $('.dropdown').click(function (e) { 
        e.preventDefault();
        $('.dropdown').toggleClass('active');
        $(this).parent().siblings().find('a').removeClass('active')
        $('.menu2').slideToggle();
        $(this).parent().siblings().find('ul').hide();
        
    });
});



