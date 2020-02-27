import I18n from 'shared/locale.js.erb'
import { alertWarning } from 'shared/alert_service'

(function ($) {
  function showSweetAlertConfirmationDialog(message, element) {
    alertWarning(
      I18n.t('confirm.confirmation_title'),
      message,
      response => {
        confirmed(element, response)
      }
    )
  }

  const confirmed = (element, result) => {
    if (result) {
      element.removeAttribute('data-confirm')
      element.click()
    }
  }
  

  function sweetAlertConfirm() {
    Rails.confirm = function (message, element) {
      showSweetAlertConfirmationDialog(message, element)
      return false
    };
  }

  $.sweetAlertConfirm = {
    init: function() {
      sweetAlertConfirm()
    }
  }
})(jQuery);