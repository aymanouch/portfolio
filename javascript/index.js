$(function() {
    // https://dashboard.emailjs.com/admin/integration
    emailjs.init('user_bgdcFTaBdLNOKigSUMcHr');
    //appel the function Anime when upload page
    uploadAnime();
    //appel function gere event to bars menu
    $(".icon-bars").on("click",function () {
        clickBars($(this));
    })
    
     //gere event click to the a
     $(".list-menu li a").on("click", function (e) {
        e.preventDefault();
        if(window.innerWidth < 768) {
            clickBars($(".icon-bars"));
        }
        clickLink($(this));
    });
    $("#scroll-link").on("click", function(e) {
        e.preventDefault();
        clickLink($(this));
    });
    //gere event click to scroll top arrow
    $(".arrow-top").on("click", function(){
          $("html, body").animate({scrollTop:0}, 300)
    });
    //gere scroll event
    if(window.innerWidth < 768) {
        scrollEffect(-10);
    } else {
        scrollEffect(0);
    }
    //gere click inputs 
    $(".client-info .input input").on("click, focus", function() {
        focusInput($(this).siblings("label"), 0);
        delteFocusInput($(this).parents(".input").siblings(".input").find("input"),$(this).parents(".input").siblings(".input").find("label"));
        delteFocusInput($("#message"), $("#message").siblings("label"));
    });
    $(".msg-input .text-area textarea").on("click, focus", function() {
        focusInput($(this).siblings("label"), 15);
        delteFocusInput($(".client-info .input:first-child input"), $(".client-info .input:first-child input").siblings("label"));
        delteFocusInput($(".client-info .input:last-child input"), $(".client-info .input:last-child input").siblings("label"));
    });
    //empty input 
    $("input, textarea").not(".btn").val("");

    // gere the form send message 
    $('#contact_form').on("submit", function (e) {
        e.preventDefault();
        let status = false;
        this.contact_number.value = Math.random() * 100000 | 0;
        const template_variable = {
            user_name:this.user_name.value.toString(),
            user_email:this.user_email.value.toString(),
            message:this.message.value.toString()
        }
        if(template_variable.user_name.length > 2) {
             status=true;
        } else {
            $('.alt').text("name most be great than 3");
            console.log(status);
        }
        if(template_variable.user_email.length > 2 && status) {
            status=true;
       } else {
           $('.alt').text("email or phone most be great than 3");
       }
       if(template_variable.message.length > 2 && status) {
        status=true;
   } else {
       $('.alt').text("message most be great than 3");
   }
        console.log(template_variable);
        if(status) {
            emailjs.send('service_rnew4bj', 'template_7uggkdn', template_variable)
                        .then(function() {
                            $('.alt').html(`<span style="color:green">SUCCESS</span>`);
                        }, function(error) {
                            console.log('FAILED...', error);
                        });
        }
    })

});



/*********************START CREATE OUR FUNCTIONS *************************************/
//create function when upload page
function uploadAnime() {
    const timeline = gsap.timeline();
    timeline.to(".first-overlay", {width:0})
    .to(".second-overlay", {height:0})
    .to(".overlay", {display:"none"});
}

//create function gere click event to circle bars 
function clickBars(elt) {
    const timeline = gsap.timeline();
    var circle = elt.find(".bars div").not(".line");
    var circleLine = $(".bars").find(".line");
    if(elt.hasClass("show")) {
        timeline.to(circle, {width:0, height:0})
        .to(circleLine, {width:"40px", borderRadius:"0"})
        .to(circleLine[0], {rotate:"45deg", y:"50%"})
        .to(circleLine[1], {rotate:"-45deg", y:"-50%"}, "<=0.9")
        .to(elt.find('.bars'), {gridTemplateColumns:"auto",gap:0}, "<=1");
        elt.toggleClass("show");

        //show menu
        showMenu($(".list-menu"));
    } else {
        timeline
        .to(elt.find('.bars'), {gridTemplateColumns:"auto auto auto",gap:"4px"}, "<=1")
        .to(circleLine, {width:"6px", borderRadius:"50%", rotate:"0deg", y:"0"})
        .to(circle, {width:"6px", height:"6px"})    ;
        elt.toggleClass("show");

        //hide menu
        hideMenu($(".list-menu"));
    }
}
//function show menu
function showMenu(menu) {
    const timeline = gsap.timeline();
    timeline.to(menu, {width:"100%"})
    .from(menu.find("li"), {x:-50, opacity:0, stagger:{each:1, amount:1, from:"center"}});
}

function hideMenu(menu) {
    const timeline = gsap.timeline();
    timeline.to(menu.find("li"), {x:-50, opacity:0, stagger:{each:1, amount:1, from:"edges"}})
    .to(menu, {width:"0%"})
    .to(menu.find("li"), {x:0, opacity:1});
}
//function scroll effect 

function scrollEffect(offset) {
    const controller = new ScrollMagic.Controller();
    const timeline = new TimelineMax(); 
    const tween = TweenMax.from(".about h1", {opacity:0, x:-50});
    const tween1 = TweenMax.from(".about img", {scale:1.3, duration:.5});
    const tweenS = TweenMax.from("#services .card", {opacity:0, scale:.5, stagger:{each:1,amount:1}});
    const tweenSkills = TweenMax.from(".skills li", {opacity:0, rotate:"-30deg", duration:.3});
    const workTimeline = new TimelineMax();
    const tweenWork = TweenMax.to("#works .work:first-child", { rotate:"30deg", x:"-100%"});
    const tweenWork1 = TweenMax.to("#works .work:last-child", { rotate:"-30deg", x:"100%"});
    workTimeline.add(tweenWork).add(tweenWork1);
    timeline.add(tween1).add(tween);
    let scene = new ScrollMagic.Scene({
        triggerElement: ".about",
        offset:offset,
    }).setTween(timeline);
    let scene1 = new ScrollMagic.Scene({
        triggerElement: "#services",
        offset:offset,
    }).setTween(tweenS);
    let sceneSkills = new ScrollMagic.Scene({
        triggerElement: ".skills",
        offset:offset,
    }).setTween(tweenSkills);
    let sceneWork = new ScrollMagic.Scene({
        triggerElement: "#works",
        offset:offset,
    }).setTween(workTimeline);
    if(window.innerWidth > 768) {
        sceneWork.addTo(controller);
    }
    controller.addScene([scene,scene1, sceneSkills]);
} 


//gere Focus and click to input text 
function focusInput(targetElt, plus) {
    let y = window.innerWidth > 768 ? -25 - plus : -25;
     gsap.to(targetElt, {y:y, zIndex:1, background:"#1c1cbd", duration:.5});    
}
function delteFocusInput(elt, targetElt) {
    if(elt.val().length <=0) {
        gsap.to(targetElt, {y:0, zIndex:0, background:"none", duration:.5});
    }
}


//scroll click events
function clickLink(elt) {  
   $("html, body").animate({
       scrollTop:$(`#${elt.data("scroll")}`).offset().top
   })
}