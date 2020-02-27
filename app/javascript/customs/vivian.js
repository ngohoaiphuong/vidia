(function ($) {
  focusing = false
  circularMenuOpenning = false
  timeOut = ''

  function onScroll() {
    let backTop = $('.btn-back-top')
    let nav = $('.buymed-nav')

    $(window).scroll(function () {
      if ($(window).scrollTop() > 150) {
        nav.addClass('shrink')
        backTop.addClass('back-show')
      }
      if ($(window).scrollTop() < 121) {
        nav.removeClass('shrink')
        backTop.removeClass('back-show')
      }
    })
  }

  function onTop() {
    $(document).off('click', '.btn-back-top').on('click', '.btn-back-top', function(event) {
      if($('.btn-back-top').hasClass('back-show')) {
        event.preventDefault();
        $('.btn-back-top').removeClass('back-show')
        $('html, body').animate({scrollTop:0}, 1000)
      }
    })
  }

  function onCircularMenu() {
    onMouseEvent()
    $(document).off('click', '.floating-btn').on('click', '.floating-btn', function(event) {
      event.preventDefault()
      document.getElementById('circularMenu').classList.toggle('active');
      circularMenuOpenning = true
      detectCircularMenu()
    })
  }

  function detectCircularMenu() {
    if(timeOut) {
      clearInterval(timeOut)
    }

    if(!$('#circularMenu').hasClass('active')) {
      return
    }

    timeOut = setInterval(() => {
      setTimeout(() => {
        if(circularMenuOpenning) {
          if($('#circularMenu').hasClass('active') && !focusing) {
            $('#circularMenu').removeClass('active')
            return
          }
        }
      }, 2500);
    }, 5000);
  }

  function onMouseEvent() {
    $(document)
      .off('mouseover', '#circularMenu .floating-btn, #circularMenu .floating-menu, #circularMenu .menu-item')
      .on('mouseover', '#circularMenu .floating-btn, #circularMenu .floating-menu, #circularMenu .menu-item', function(event) {
        focusing = true
    })

    $(document)
      .off('mouseout', '#circularMenu .floating-btn, #circularMenu .floating-menu, #circularMenu .menu-item')
      .on('mouseout', '#circularMenu .floating-btn, #circularMenu .floating-menu, #circularMenu .menu-item', function(event) {
        focusing = false
    })
  }

  $.vivian = {
    init: function() {
      onScroll()
      onCircularMenu()
      onTop()
    }
  }
})(jQuery);