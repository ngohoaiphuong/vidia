import { alertError } from 'shared/alert_service'

function buymedDialog(href) {
  let modal_holder_selector = '#modal-holder'
  let modal_selector = '.modal'

  $('.modal-backdrop').remove()
  $(modal_selector).remove()

  $.get(href, response => {
    $(modal_holder_selector).html(response).find(modal_selector).modal()
  }).done(function() {
    $(document).on('ajax:success', 'form[data-modal]', function(event) {
      buymedCloseModal()
    })
  }).fail(function(e) {
    console.log(e)
    alertError(
      e.responseText
    )
  })
}

function buymedCloseModal() {
  let modal_selector = '.modal'

  $('.modal-backdrop').remove()
  $(modal_selector).modal('hide')
  $(modal_selector).remove()
}

function buymedLink(href) {
  let holder_selector = '#modal-holder'
  $('.buymed-modal-link').remove()
  $(
    '<a>', {
      class: 'buymed-modal-link',
      text: 'link',
      title: 'link',
      'data-modal': true,
      href: href
    }
  ).appendTo(holder_selector)
  $('.buymed-modal-link')[0].click()
}

export {
  buymedDialog,
  buymedLink,
  buymedCloseModal
}