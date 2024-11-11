$(window).on("load", function() {
    let slideIndex = $('.slide.active').index();
    const slideLen = $(".slide").length;
    const targetDate = new Date("Dec 23, 2024 00:00:00").getTime();

    function slideShow() {
        $(".slide").removeClass("active").eq(slideIndex).addClass("active");
        if (slideIndex == slideLen - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        setTimeout(slideShow, 5000);
    }

    function startCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Apply the values to each slide's countdown elements
        $('.time#countdown-days').text(days);
        $('.time#countdown-hours').text(hours);
        $('.time#countdown-minutes').text(minutes);
        $('.time#countdown-seconds').text(seconds);
    }

    slideShow();
    setInterval(startCountdown, 1000);
});


//gallery popup
$(document).ready(function(){
    //nav toggle
    $(".hamburger-btn").click(function(){
        $(".header .nav").slideToggle();
    })
    $(".header .nav").click(function(){
        if($(window).width() < 869){
            $(".header .nav").slideToggle();
        }
    })

    //fixed header
    $(window).scroll(function(){
        if($(this).scrollTop() > 100){
            $(".header").addClass("fixed");
        }
        else{
            $(".header").removeClass("fixed");
        }
    })

    //scrollIt
    $.scrollIt({
        topOffset: -50
    });

    const wHeight = $(window).height();
    $(".gallery-popup .gp-img").css("max-height", wHeight + "px");

    let itemIndex = 0;
    const totalGalleryItem = $(".gallery-item").length;
    console.log(totalGalleryItem);

    $(".gallery-item").click(function(){
        itemIndex = $(this).index();
        $(".gallery-popup").addClass("open");
        $(".gallery-popup .gp-img").hide();
        gpSlideShow();
    })

    $(".gp-controls .next").click(function(){
        if (itemIndex == totalGalleryItem-1){
            itemIndex = 0;
        } else{
            itemIndex++;
        }
        $(".gallery-popup .gp-img").fadeOut(function(){
            gpSlideShow();
        });
    });

    $(".gp-controls .prev").click(function(){
        if (itemIndex == 0){
            itemIndex = totalGalleryItem-1;
        } else{
            itemIndex--;
        }
        $(".gallery-popup .gp-img").fadeOut(function(){
            gpSlideShow();
        });
    });

    function gpSlideShow(){
        const imgSrc = $(".gallery-item").eq(itemIndex).find("img").attr("data-large");
        $(".gallery-popup .gp-img").fadeIn().attr("src", imgSrc);
        $(".gp-counter").text((itemIndex+1)+"/"+totalGalleryItem);
    }

    //close gallery popup
    $(".gp-close").click(function(){
        $(".gallery-popup").removeClass("open");
    })

    //hide gallery popup when clicked outside of gp-container
    $(".gallery-popup").click(function(event){
        if($(event.target).hasClass("open")){
            $(".gallery-popup").removeClass("open");
        }
    })
})
