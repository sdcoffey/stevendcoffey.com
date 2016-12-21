$(document).ready(function() {
  //TODO: Add opacity focus to visible image in mobile
  // Move captions below on mobile
  $('.lightbox').addClass('hidden');

  $('.grid-item').click(function(event) {
    if (isMobile()) {
      return;
    }
    var img = $(this).find('img')[0];
    var p = $($(this).find('p')[0]);
    $('.lightbox').addClass('visible');
    $('.lightbox').removeClass('hidden');
    var id = img.id.split("_")[1];
    $('.lightbox').attr('data-id', id);
    $('#lbImg').addClass('no-top-margin');
    $('#lbImg').attr('src', $(img).attr('src'));

    $('body').addClass('noscroll');
  });

  function hideLightbox() {
    $('body').removeClass('noscroll');
    $('.lightbox').removeClass('visible');
    $('#lbImg').removeClass('no-top-margin');
    setTimeout(function() {
      $('.lightbox').addClass('hidden');
    }, 300);
  }

  $('.lightbox').click(function(e) {
    if ($(e.target).is('img')) return;
    hideLightbox();
  });

  function move(by) {
    var sibImages = $('.grid').children('.grid-item');
    var currentIndex = parseInt($('.lightbox').attr('data-id'), 10);
    var next = currentIndex + by;
    if (next >= sibImages.length) {
      next = 0;
    } else if (next < 0) {
      next = sibImages.length - 1;
    }
    var newImgId = "img_" + next;
    var newPId = "p_" + next;
    $('#lbImg').attr('src', $('#' + newImgId).attr('src'));
    $('.lightbox').attr('data-id', next);
  }

  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

  $(document).keyup(function(e) {
    if (e.keyCode === 27) {
      hideLightbox();
    }
    if ($('.lightbox').hasClass('visible')) {
      if (e.keyCode === 39){ // right
        move(1);
      } else if (e.keyCode === 37) {
        move(-1);
      }
    }
  });
});
