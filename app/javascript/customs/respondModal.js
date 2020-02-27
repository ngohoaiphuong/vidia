import { buymedDialog } from '../shared/modal_service'

(function ($) {
  const handleModal = function (e) {
    if (Rails.fire(this, 'modal')) {
      let href =  Rails.href(e.target)
      if(href === undefined) {
        href = Rails.href(e.target.parentNode)
      }
      buymedDialog(href)
    }
    Rails.stopEverything(e)
  };

  function response2Modal() {
    Rails.delegate(document, 'a[data-modal="true"]', 'click', handleModal);
  }

  $.response2Modal = {
    init: function() {
      response2Modal()
    }
  }
})(jQuery);