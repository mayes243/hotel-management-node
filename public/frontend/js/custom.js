$(document).ready(function(){

    // Fixed-Navbar

    $(window).scroll(function() {
        var windscroll = $(window).scrollTop();
        if (windscroll >= 100) {
            $('.header nav').addClass('fixed');
        } else {
            $('.header nav').removeClass('fixed');
        }
    
    }).scroll();

    // Hero-Slider
    $(".hero-main .carousel").carousel({
        interval: 6000,
        pause: "false",
    });

    // Isotope

    $('.iso-item').isotope({
        itemSelector: '.item',
        layoutMode: 'fitRows'
    });

    $('.iso-menu ul li').click(function(){
        $('.iso-menu ul li').removeClass('active');
        $(this).addClass('active');

        var selector = $(this).attr('data-filter');
        $('.iso-item').isotope({
            filter: selector
        });

        return false;
        
    });

    // Testimonials-Slider
    $(".testimonial-right .carousel").carousel({
        interval: 4000,
        pause: "false",
    });

    // LightBox

    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'fadeDuration': 500
    })

    // Scroll To Top Button

    $('#to-top-btn').on('click',function(){
        $('html , body').scrollTop(0);
    });

    // Register Form Trigger

    function toggleReset(e){
        e.preventDefault();
        $('#reset').toggle();
    }

    function toggleLogin(e){
        e.preventDefault();
        $('#login').toggle(); 
    }

    $(()=>{

        $('#bttn-login1').click(toggleLogin);
        $('#bttn-login1').click(toggleReset);

        $('#bttn-login2').click(toggleReset);
        $('#bttn-login2').click(toggleLogin);

    });

    // Dashboard Widget Accordion

    $('.wig-toggler').on('click',function(){
        var pannel=$(this).attr('data-pannel');
        $('#'+pannel).toggleClass('active');
        $('#'+pannel+' .wig-content').slideToggle('medium');
    });

    // Data-Table

    $('#data-table').DataTable();

}); 