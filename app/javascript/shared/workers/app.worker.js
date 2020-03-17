import { registerLocalStorage } from '../../customs/storage'

const _ = require('lodash')

self.addEventListener('message', (event) => {
  if(_.has(event.data, 'type') && event.data.type === 'ping') {
    return self.postMessage('Yes, pong')
  }
  if(_.has(event.data, 'type') && event.data.type === 'connected') {
    registerLocalStorage()
    return self.postMessage('welcome')
    // return self.terminate()
  }
})