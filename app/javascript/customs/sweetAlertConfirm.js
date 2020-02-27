// import swal from 'sweetalert'
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
    // swal({
    //   title: I18n.t('confirm.confirmation_title'),
    //   text: message,
    //   icon: 'warning',
    //   dangerMode: true,
    //   buttons: {
    //     confirm: {
    //       text: I18n.t('confirm.ok'),
    //       value: true,
    //       visible: true,
    //       closeModal: true
    //     },
    //     cancel: {
    //       text: I18n.t('confirm.cancel'),
    //       value: false,
    //       visible: true,
    //       closeModal: true,
    //     }
    //   }
    // }).then(
    //   select => {
    //     confirmed(element, select)
    //   }
    // )
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