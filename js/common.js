window.addEventListener('load', (e) => {
  // var rellax = new Rellax('.rellax');

  // let offset
  // if (window.innerWidth > 991) {
  //     offset = 150;
  // } else {
  //     offset = 20;
  // }

  // AOS.init({
  //     easing: 'ease',
  //     delay: 100,
  //     once: true,
  //     duration: 1000,
  //     offset: offset,
  // });

  // var scene = document.querySelectorAll('.parallax');
  // if (scene) {
  //     scene.forEach(element => {
  //         var parallaxInstance = new Parallax(element)
  //     });
  // }

  //   menu
  $('.menu_btn').on('click', function (e) {
    $('.menu_btn').toggleClass('active');
    $('.menu').toggleClass('active');
    $('html').toggleClass('locked');
  });

  // скролл к секции
  $('.menu_nav a').on('click', function (e) {
    e.preventDefault();
    let href = $(this).attr('href');
    $('.menu_btn').removeClass('active');
    $('.menu').removeClass('active');
    $('html').removeClass('locked');

    $('html, body').animate(
      {
        scrollTop: $(href).offset().top,
      },
      {
        easing: 'linear',
      }
    );

    return false;
  });

  //tabs
  const tabsItem = $('.tabs_content_item');
  tabsItem.hide().filter(':first').show().addClass('active');

  $('.tabs_nav_item').on('click', function (e) {
    e.preventDefault();
    tabsItem.hide();
    tabsItem.filter(this.hash).show();
    $('.tabs_nav_item').not(this).removeClass('active');
    $(this).addClass('active');
    return false;
  });

  //   слайдер
  const fleetSlider = new Swiper('.fleet_slider', {
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 600,
    effect: 'fade',
    // autoHeight: true,
    watchOverflow: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  //   скрыть/показать контент в слайдере
  $('.show_btn').on('click', function (e) {
    $(this).toggleClass('active');
    $(this).prev().slideToggle();
  });

  // Маска для инпутов с номером телефона
  const phoneInputs = document.querySelectorAll('input[type=tel]');
  phoneInputs.forEach((input) => {
    $(input).mask('+7 (999) 999-99-99');
  });
});
