require('@rails/ujs').start()
require('turbolinks').start()
require('@rails/activestorage').start()
require('channels')

import 'controllers'
import 'imagesloaded'

import { NoticeMessage } from '../shared/notice_message'

import '../stylesheets/application'

$(document).on('turbolinks:load', function () {
  document.addEventListener('touchstart', function () { }, true)

  window.notice = new NoticeMessage()
})
