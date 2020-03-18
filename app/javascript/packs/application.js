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
require('../customs/jsgrid')

import { registerGeneralChannel } from '../channels/general_channel'
import { registerLocalStorage } from '../customs/storage'
import { registerWorkers } from '../customs/workers'
import { LocalEventService } from 'shared/local_event_service'

const cookie = require('js-cookie')

document.addEventListener('DOMContentLoaded', function() {
  swRegister()
})

$(document).on('turbolinks:load', function () {
  document.addEventListener('touchstart', function () { }, true)
  
  $.sweetAlertConfirm.init()
  $.buymed.init()
  $.response2Modal.init()

  window.notice = new NoticeMessage()

  registerGeneralChannel()
  registerLocalStorage()
  registerWorkers()
})
