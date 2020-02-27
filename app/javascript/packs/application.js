require('@rails/ujs').start()
require('turbolinks').start()
require('@rails/activestorage').start()
require('channels')

import 'controllers'

import '../stylesheets/application'

import '../customs/bootstrap'
import '../customs/offline'
import '../customs/sweetAlertConfirm'
import '../customs/vivian'
import '../customs/respondModal'

import { swRegister } from '../customs/serviceworker'

document.addEventListener('DOMContentLoaded', function() {
  swRegister()
})

$(document).on('turbolinks:load', function () {
  document.addEventListener('touchstart', function () { }, true)
})
