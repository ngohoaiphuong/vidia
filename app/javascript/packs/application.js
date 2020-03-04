require('@rails/ujs').start()
require('turbolinks').start()
require('@rails/activestorage').start()
require('channels')

import 'controllers'

import '../stylesheets/application'

import '../customs/bootstrap'
import '../customs/offline'
import '../customs/sweetAlertConfirm'
import '../customs/buymed'
import '../customs/respondModal'

import { swRegister } from '../customs/serviceworker'
import { NoticeMessage } from '../shared/notice_message'

require('admin-lte')

document.addEventListener('DOMContentLoaded', function() {
  swRegister()
})

$(document).on('turbolinks:load', function () {
  document.addEventListener('touchstart', function () { }, true)
  
  $.sweetAlertConfirm.init()
  $.buymed.init()
  $.response2Modal.init()

  window.notice = new NoticeMessage()
})
