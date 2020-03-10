import I18n from 'shared/locale.js.erb'

function TrashAttr(href, confirm) {
  return {
    method: 'delete',
    class: 'mr-1',
    href: href || 'javascript:void(0)',
    'data-confirm': confirm || I18n.t('confirm.delete'),
    'data-modal': true
  }
}

function CallAttr(phone) {
  return {
    href: `tel:${phone}`,
    class: 'btn btn-outline-success btn-xs mr-1'
  }
}

function SMSAttr() {
  return {
    href: 'javascript:void(0)',
    class: 'btn btn-outline-warning btn-xs mr-1'
  }
}

export {
  TrashAttr, CallAttr, SMSAttr
}
