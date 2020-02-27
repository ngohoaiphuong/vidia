import swal from 'sweetalert'
import I18n from 'shared/locale.js.erb'

function alertWarning(title, message, callback) {
  swal({
    title: title,
    text: message,
    icon: 'warning',
    dangerMode: true,
    buttons: {
      confirm: {
        text: I18n.t('confirm.ok'),
        value: true,
        visible: true,
        closeModal: true
      },
      cancel: {
        text: I18n.t('confirm.cancel'),
        value: false,
        visible: true,
        closeModal: true,
      }
    }
  }).then(
    select => {
      if(callback) {
        callback(select)
      }
    }
  )
}

function alertError(message) {
  swal({
    title: I18n.t('alert.titles.error'),
    text: message,
    icon: 'error',
    dangerMode: true
  })
}

export {
  alertWarning,
  alertError
}