import { readyNotification } from '../customs/web_notification'

function ServiceWorkAlready(reg) {
  if (reg.installing) {
    return reg.installing
  }
  if (reg.waiting) {
    return reg.waiting
  }
  if (reg.active) {
    return reg.active
  }
}

function swRegister() {
  if(navigator.serviceWorker) {
    navigator.serviceWorker.register('/serviceworker.js', { scope: './' })
    .then(function(reg) {
      console.log('[Companion]', 'Service worker registered!')
      let sw = ServiceWorkAlready(reg)
      if(sw) {
        if (sw.state == "activated") {
          readyNotification()
        } else  {
          sw.addEventListener("statechange", function(e) {
            if (e.target.state == "activated") {
              console.log("Just now activated. now we can subscribe for push notification")
              readyNotification()
            }
          })
        }
      }
    });
  }
}

export {
  swRegister
}