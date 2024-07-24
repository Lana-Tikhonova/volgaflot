window.addEventListener('load', (e) => {
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
  const fleetSliders = document.querySelectorAll('.fleet_slider');
  fleetSliders.forEach((fleetSliderEl) => {
    const fleetSlider = new Swiper(fleetSliderEl, {
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 400,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  });

  //   скрыть/показать контент в слайдере
  $('.show_btn').on('click', function (e) {
    $(this).toggleClass('active');
    $(this).prev().slideToggle();
  });

  // анимация
  let offset;
  if (window.innerWidth > 991) {
    offset = 150;
  } else {
    offset = 20;
  }

  AOS.init({
    easing: 'ease',
    delay: 100,
    once: true,
    duration: 1000,
    offset: offset,
  });

  lax.init();
  lax.addDriver(
    'scrollY',
    function () {
      return window.scrollY;
    },
    {
      frameStep: 1,
      inertiaEnabled: true,
    }
  );

  lax.addElements('.ship_01 img', {
    scrollY: {
      translateX: [
        ['elInY', 'elCenterY+100', 'elOutY'],
        [0, '-100', '-200'],
      ],
    },
  });

  lax.addElements('.ship_02 img', {
    scrollY: {
      translateX: [
        ['elInY', 'elCenterY+100', 'elOutY'],
        [0, '100', '200'],
      ],
    },
  });

  const form = () => {
    // Маска для инпутов с номером телефона
    const phoneInputs = document.querySelectorAll('.form_input[type="tel"]');
    phoneInputs.forEach((input) => {
      IMask(input, {
        mask: '+{7} (000) 000-00-00',
      });
    });

    // валидация
    const forms = document.querySelectorAll('.validate_form');
    forms.forEach((form) => {
      const inputText = form.querySelectorAll('.form_input[type="text"]');
      const userName = form.querySelector('.form_input[name="fio"]');
      const userEmail = form.querySelector('.form_input[type="email"]');
      const userPhone = form.querySelector('.form_input[type="tel"]');
      const textArea = form.querySelector('.form_textarea');
      const formAfter = document.querySelector('.form_after');

      if (inputText) {
        for (let i = 0; i < inputText.length; i++) {
          inputText[i].addEventListener('input', removeErr);
        }
      }
      if (userName) {
        userName.addEventListener('input', removeErr);
      }
      if (userEmail) {
        userEmail.addEventListener('input', removeErr);
      }
      if (userPhone) {
        userPhone.addEventListener('input', removeErr);
      }
      if (textArea) {
        textArea.addEventListener('input', removeErr);
      }

      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (inputText) {
          for (let i = 0; i < inputText.length; i++) {
            if (!inputText[i].hasAttribute('disabled')) {
              if (inputText[i].value.trim().length < 1) {
                inputText[i]
                  .closest('.form_input_group')
                  .classList.add('error');
              }
            }
          }
        }
        if (userName && !userName.hasAttribute('disabled')) {
          if (userName.value.trim().length < 1) {
            userName.closest('.form_input_group').classList.add('error');
          }
        }
        if (userEmail) {
          if (!userEmail.hasAttribute('disabled')) {
            validEmailFunc(userEmail);
          }
        }
        if (userPhone && !userPhone.hasAttribute('disabled')) {
          if (userPhone.value.replace(/\D/g, '').length < 11) {
            userPhone.closest('.form_input_group').classList.add('error');
          }
        }
        if (textArea) {
          if (textArea.value.trim().length < 1) {
            textArea.closest('.form_input_group').classList.add('error');
          }
        }

        const formErrors = form.querySelector('.error');
        if (formErrors) {
          $('html, body').animate(
            {
              scrollTop: $('.error').offset().top - 120,
            },
            100
          );
          return;
        }

        //backend ajax
        form.classList.add('hide');
        formAfter.classList.add('show');
        form.reset();

        // fetch(e.target.action, {
        //   method: 'POST',
        //   body: new FormData(form),
        // })
        //   .then((response) => response.json())
        //   .then((body) => {
        //   })
        //   .catch((error) => {});
      });
    });
  };

  form();

  $('.form_after .btn').on('click', function (e) {
    $('.form_after').removeClass('show');
    $('.form').removeClass('hide');
  });

  function removeErr(e) {
    e.target.closest('.form_input_group').classList.remove('error');
  }

  // проверка валидности email
  function validEmailFunc(userEmail) {
    const userEmailVal = userEmail.value;
    if (userEmailVal.length < 1) {
      userEmail.closest('.form_input_group').classList.add('error');
      userEmail.nextElementSibling.innerHTML = 'Заполните поле';
    } else {
      var regEx =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var validEmail = regEx.test(userEmailVal);
      if (!validEmail) {
        userEmail.closest('.form_input_group').classList.add('error');
        userEmail.nextElementSibling.innerHTML =
          'Пожалуйста, введите корректный адрес электронной почты.';
      }
    }
  }
});
