///////////////////////////////////////////////////
jQuery(document).ready(function (jQuery) {
  let widthPage = jQuery(document).width();
  if (widthPage >= 600) {
    const deviceWrapper = document.querySelector(".device");
    const devicevideo = deviceWrapper.querySelector(".device-video");
    const deviceWrapperTop = offset(deviceWrapper).top;
    const filterPagetext1 = deviceWrapper.querySelector(".device-content");

    const textAnim1 = TweenMax.fromTo(
      filterPagetext1,
      0.1,
      { opacity: 1 },
      { opacity: 0 }
    );

    const devicecontroller = new ScrollMagic.Controller();

    let devicescene = new ScrollMagic.Scene({
      duration: 1400,
      triggerElement: deviceWrapper,
      triggerHook: 0,
    })
      .setPin(deviceWrapper)
      .addTo(devicecontroller);

    let devicescene2 = new ScrollMagic.Scene({
      duration: 0,
      triggerElement: deviceWrapper,
      triggerHook: 0,
      offset: "50px",
    })
      .on("enter", function () {
        devicevideo.classList.add("visible");
      })
      .on("leave", function () {
        devicevideo.classList.remove("visible");
      })
      .setTween(textAnim1)
      .addTo(devicecontroller);

    let devicescene3 = new ScrollMagic.Scene({
      duration: 0,
      triggerElement: deviceWrapper,
      triggerHook: 0,
      offset: "1300px",
    }).addTo(devicecontroller);

    //video animation

    let deviceaccelamount = 0.1;
    let devicescrollpos = 0;
    let devicedelay = 0;

    devicescene.on("update", (e) => {
      devicescrollpos = (e.scrollPos - deviceWrapperTop) / 150;
    });

    setInterval(() => {
      devicedelay += (devicescrollpos - devicedelay) * deviceaccelamount;

      devicevideo.currentTime = devicedelay;
    }, 33.3);
    function offset(el) {
      const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

jQuery(document).ready(function () {
  //////////////////////ініціалізація слайдера//////////////////
  jQuery(".baner__slider").addClass("owl-carousel owl-theme");
  jQuery(".baner__slider").owlCarousel({
    items: 1,
    dots: false,
    loop: true,
    center: true,
    nav: true,
  });
  //////////////////////ініціалізація слайдера//////////////////
  jQuery(".app__slider").addClass("owl-carousel owl-theme");
  jQuery(".app__slider").owlCarousel({
    items: 2.5,
    dots: false,
    center: true,
    nav: true,
    animateOut: "fOut",
    animateIn: "fIn",
  });
  //////////////////////ініціалізація слайдера//////////////////
  if (jQuery(".talking__media--item").length > 3) {
    jQuery(".talking__media--list").addClass("owl-carousel owl-theme");
    jQuery(".talking__media--list").owlCarousel({
      items: 4,
      dots: false,
      nav: true,
      responsive: {
        0: {
          items: 2,
          margin: 10,
        },
        600: {
          items: 4,
          margin: 30,
        },
      },
    });
  }
  ///////////відкриття при клікє (акардіон)talking///////////////
  jQuery(".talking__btn").click(function () {
    jQuery(".talking__btn").removeClass("_active-btn");
    jQuery(this).addClass("_active-btn");

    if (jQuery(this).hasClass("talking__btn--media")) {
      jQuery(this).parents(".talking__wrapper").find(".talking__media").show();
      jQuery(this)
        .parents(".talking__wrapper")
        .find(".talking__testimonials")
        .hide();
    }

    if (jQuery(this).hasClass("talking__btn--testimonials")) {
      jQuery(this).parents(".talking__wrapper").find(".talking__media").hide();
      jQuery(this)
        .parents(".talking__wrapper")
        .find(".talking__testimonials")
        .show();
    }
  });
  // menu (додавання класа при клікє)
  jQuery(".header__burger-menu").click(function () {
    jQuery(".header__burger-menu").toggleClass("_js--open-menu");
    jQuery(".header__menu").toggleClass("_js--open-menu");
    jQuery(".header").toggleClass("_js--open-menu");
    jQuery("body").toggleClass("noscroll");
  });
  jQuery(".header__menu").on("click", "a", function (event) {
    jQuery(".header__burger-menu").removeClass("_js--open-menu");
    jQuery(".header__menu").removeClass("_js--open-menu");
    jQuery(".header").removeClass("_js--open-menu");
    jQuery("body").removeClass("noscroll");
  });

  /////////////скрити прі скролі вниз і відобразити при скролі вгору//////////////////////
  var widthPage = jQuery(document).width();
  if (widthPage >= 600) {
    let g_top = 0;
    jQuery(window).scroll(function () {
      if (window.scrollY > window.innerHeight / 10) {
        let top = jQuery(this).scrollTop();
        if (top > g_top) {
          jQuery(".header").addClass("fadeOut");
        } else {
          jQuery(".header").removeClass("fadeOut");
        }
        g_top = top;
      }
    });
  }
});
//////////////////////////анімація цифр/////////////////////////////////
function count(className) {
  var countBlockTop = jQuery("." + className).offset().top;
  var windowHeight = window.innerHeight;
  var show = true;

  jQuery(window).scroll(function () {
    if (show && countBlockTop < $(window).scrollTop() + windowHeight) {
      show = false;

      jQuery("." + className).spincrement({
        from: 0,
        duration: 5000,
        // thousandSeparator: "",
        decimalPoint: ".",
      });
    }
  });
}

jQuery(document).ready(function () {
  if (jQuery(".statistics__item").length > 0) {
    count("statistics__amount");
  }
});

/////////////////анімацыя слова(речення)////////////////////////////////////

function animateWord(word, wordWrapper) {
  let text = word.textContent;
  text.split("").forEach((letter, ind) => {
    let div = document.createElement("div");
    div.innerText = letter;
    wordWrapper.append(div);
  });
}

const words = document.querySelectorAll(".services__item-title--text");
words.forEach((word) => {
  wordWrapper = word.closest(".services__item-title");
  animateWord(word, wordWrapper);
});

document.querySelectorAll(".anim--word").forEach((item) => {
  animateWord(item, item.closest(".anim--wordWrapper"));
});

/////////////////////////анімація при скролі///////////////////////////////////////////
const animItems = document.querySelectorAll("._anim-items");
if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top - 100;
      const animStart = 100;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("_js_active");
      } else {
        if (!animItem.classList.contains("_anim-no-hide")) {
          animItem.classList.remove("_js_active");
        }
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
  setTimeout(() => {
    animOnScroll();
  }, 200);
}

//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////
jQuery(document).ready(function () {
  //////////////////////ініціалізація слайдера//////////////////
  jQuery(".product__slider").addClass("owl-carousel owl-theme");
  jQuery(".product__slider").owlCarousel({
    items: 9,
    dots: false,
    nav: false,
    smartSpeed: 2000,
    margin: 50,
    responsive: {
      0: {
        items: 5,
        margin: 10,
      },
      600: {
        items: 9,
        margin: 50,
      },
    },
  });
});

let mCounter = 0,
  mDirect = "prev",
  mLast;
jQuery(".product__slider").on("mousemove", function (e) {
  if (e.pageX > mLast) {
    if (mDirect == "prev") {
      mDirect = "next";
      mCounter = 0;
    }
    ++mCounter;
  } else if (e.pageX < mLast) {
    if (mDirect == "next") {
      mDirect = "prev";
      mCounter = 0;
    }
    --mCounter;
  }

  if (mCounter == 70) {
    console.log(e.pageX, "next");
    jQuery(".product__slider").trigger("next.owl.carousel");
    mCounter = 0;
  } else if (mCounter == -70) {
    console.log(e.pageX, "prev");
    jQuery(".product__slider").trigger("prev.owl.carousel");
    mCounter = 0;
  }

  mLast = e.pageX;
});

//////////////popup з prev i post efects/////////////

jQuery(document).ready(function () {
  //popup - iframe
  jQuery(".open-popup__btn").magnificPopup({
    type: "inline",
    removalDelay: 300,
    mainClass: "my-mfp-slide-bottom",
    midClick: true,
    callbacks: {
      open: function () {
        jQuery("body").addClass("noscroll");
      },
      close: function () {
        jQuery("body").removeClass("noscroll");
      },
    },
  });
});
jQuery(".prod-popup__close-btn").click(function () {
  jQuery(".open-popup__btn").magnificPopup("close");
});

////////////////відкриття FAQ (додовання класса и js анімація  fadeIn fadeOut)

jQuery(document).ready(function () {
  jQuery(".faq__questions--list")
    .find(".faq__questions--item:first-child()")
    .addClass("_js-show-hide-content");
  jQuery(".faq__questions--visible--btn").click(function () {
    jQuery(this)
      .parents(".faq__questions--item")
      .toggleClass("_js-show-hide-content");
    jQuery(this)
      .parents(".faq__questions--item")
      .children(".faq__questions--hide")
      .fadeToggle(100);

    jQuery(".faq__questions--hide")
      .not(
        jQuery(this)
          .parents(".faq__questions--item")
          .children(".faq__questions--hide")
      )
      .fadeOut(10);
    jQuery(".faq__questions--item")
      .not($(this).parents(".faq__questions--item"))
      .removeClass("_js-show-hide-content");
  });
});

////////////////////////////////////////////////////////////////

const swiperIMG = new Swiper(".swiper-container", {
  direction: "vertical",
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 5,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const swiperTEXT = new Swiper(".review__slider-container", {
  autoHeight: true,
  slidesPerView: 1,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
});

swiperIMG.controller.control = swiperTEXT;

let clickSlide = document.querySelectorAll(".testimonials__slide");
clickSlide.forEach((element) => {
  element.addEventListener("click", (event) => {});
});

jQuery(".talking__testimonials-wrapper").on(
  "click",
  ".swiper-wrapper",
  function (e) {
    e.preventDefault();
    jQuery(".testimonials__slide").removeClass("swiper-slide-active");
    jQuery(e.target)
      .parents(".testimonials__slide")
      .addClass("swiper-slide-active");
    var targetItem = jQuery(e.target).parents(".testimonials__slide").index();
    swiperTEXT.slideTo(targetItem);
  }
);

/////////////////////////////////////////////////////////////////////////////
///////////////////плавний скролл//////////////////////////////

jQuery(document).ready(function () {
  jQuery(".header__menu-link").on("click", function (event) {
    event.preventDefault();
    var id = jQuery(this).attr("href"),
      top = jQuery(id).offset().top;
    jQuery("body,html").animate({ scrollTop: top }, 800);
  });
});

// //Active Menu When Scroll-----------------------------------

window.addEventListener("scroll", function setBackground() {
  var itemColor = document.querySelectorAll(".header__menu-link");
  var baner = jQuery("#home").offset().top - 150;
  var about = jQuery("#about").offset().top - 150;
  var moods = jQuery("#moods").offset().top - 150;
  var device = jQuery("#device").offset().top - 150;
  var app = jQuery("#app").offset().top - 150;
  var talking = jQuery("#talking").offset().top - 150;
  var faq = jQuery("#faq").offset().top - 150;
  var contact = jQuery("#contact").offset().top - 150;

  if (window.scrollY >= 0 && window.scrollY < baner) {
    itemColor[0].classList.remove("_js-scroll-active");
    itemColor[1].classList.remove("_js-scroll-active");
    itemColor[2].classList.remove("_js-scroll-active");
    itemColor[3].classList.remove("_js-scroll-active");
    itemColor[4].classList.remove("_js-scroll-active");
    itemColor[5].classList.remove("_js-scroll-active");
    itemColor[6].classList.remove("_js-scroll-active");
    itemColor[7].classList.remove("_js-scroll-active");
  } else if (window.scrollY >= baner && window.scrollY < about) {
    console.log("about");
    itemColor[0].classList.add("_js-scroll-active");
    itemColor[1].classList.remove("_js-scroll-active");
    itemColor[2].classList.remove("_js-scroll-active");
    itemColor[3].classList.remove("_js-scroll-active");
    itemColor[4].classList.remove("_js-scroll-active");
    itemColor[5].classList.remove("_js-scroll-active");
    itemColor[6].classList.remove("_js-scroll-active");
    itemColor[7].classList.remove("_js-scroll-active");
  } else if (window.scrollY >= about && window.scrollY < moods) {
    itemColor[0].classList.remove("_js-scroll-active");
    itemColor[1].classList.add("_js-scroll-active");
    itemColor[2].classList.remove("_js-scroll-active");
    itemColor[3].classList.remove("_js-scroll-active");
    itemColor[4].classList.remove("_js-scroll-active");
    itemColor[5].classList.remove("_js-scroll-active");
    itemColor[6].classList.remove("_js-scroll-active");
    itemColor[7].classList.remove("_js-scroll-active");
  } else if (window.scrollY >= moods && window.scrollY < device) {
    itemColor[0].classList.remove("_js-scroll-active");
    itemColor[1].classList.remove("_js-scroll-active");
    itemColor[2].classList.add("_js-scroll-active");
    itemColor[3].classList.remove("_js-scroll-active");
    itemColor[4].classList.remove("_js-scroll-active");
    itemColor[5].classList.remove("_js-scroll-active");
    itemColor[6].classList.remove("_js-scroll-active");
    itemColor[7].classList.remove("_js-scroll-active");
  } else if (window.scrollY >= device && window.scrollY < app) {
    itemColor[0].classList.remove("_js-scroll-active");
    itemColor[1].classList.remove("_js-scroll-active");
    itemColor[2].classList.remove("_js-scroll-active");
    itemColor[3].classList.add("_js-scroll-active");
    itemColor[4].classList.remove("_js-scroll-active");
    itemColor[5].classList.remove("_js-scroll-active");
    itemColor[6].classList.remove("_js-scroll-active");
    itemColor[7].classList.remove("_js-scroll-active");
  } else if (window.scrollY >= app && window.scrollY < talking) {
    itemColor[0].classList.remove("_js-scroll-active");
    itemColor[1].classList.remove("_js-scroll-active");
    itemColor[2].classList.remove("_js-scroll-active");
    itemColor[3].classList.remove("_js-scroll-active");
    itemColor[4].classList.add("_js-scroll-active");
    itemColor[5].classList.remove("_js-scroll-active");
    itemColor[6].classList.remove("_js-scroll-active");
    itemColor[7].classList.remove("_js-scroll-active");
  } else if (window.scrollY >= talking && window.scrollY < faq) {
    itemColor[0].classList.remove("_js-scroll-active");
    itemColor[1].classList.remove("_js-scroll-active");
    itemColor[2].classList.remove("_js-scroll-active");
    itemColor[4].classList.remove("_js-scroll-active");
    itemColor[3].classList.remove("_js-scroll-active");
    itemColor[5].classList.add("_js-scroll-active");
    itemColor[6].classList.remove("_js-scroll-active");
    itemColor[7].classList.remove("_js-scroll-active");
  } else if (window.scrollY >= faq && window.scrollY < contact) {
    itemColor[0].classList.remove("_js-scroll-active");
    itemColor[1].classList.remove("_js-scroll-active");
    itemColor[2].classList.remove("_js-scroll-active");
    itemColor[5].classList.remove("_js-scroll-active");
    itemColor[4].classList.remove("_js-scroll-active");
    itemColor[3].classList.remove("_js-scroll-active");
    itemColor[6].classList.add("_js-scroll-active");
    itemColor[7].classList.remove("_js-scroll-active");
  } else if (window.scrollY >= contact) {
    itemColor[0].classList.remove("_js-scroll-active");
    itemColor[1].classList.remove("_js-scroll-active");
    itemColor[2].classList.remove("_js-scroll-active");
    itemColor[3].classList.remove("_js-scroll-active");
    itemColor[6].classList.remove("_js-scroll-active");
    itemColor[5].classList.remove("_js-scroll-active");
    itemColor[4].classList.remove("_js-scroll-active");
    itemColor[7].classList.add("_js-scroll-active");
  }
});
