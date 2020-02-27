require('@rails/ujs').start()
require('turbolinks').start()
require('@rails/activestorage').start()
require('channels')

import 'controllers'
import '../customs/bootstrap'
import '../customs/offline'

document.addEventListener('DOMContentLoaded', function() {
})

$(document).on('turbolinks:load', function () {
  document.addEventListener('touchstart', function () { }, true)
})
