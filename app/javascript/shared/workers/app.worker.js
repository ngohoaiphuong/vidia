import { registerLocalStorage } from '../../customs/storage'
import { AddressService } from 'shared/storages/address_service'
const _ = require('lodash')

self.addEventListener('message', (event) => {
  if(_.has(event.data, 'type') && event.data.type === 'ping') {
    return self.postMessage('Yes, pong')
  }
  if(_.has(event.data, 'type') && event.data.type === 'connected') {
    // registerLocalStorage(self)
    let addressService = new AddressService(self)
    setTimeout(addressService.run(), 1000)
    self.postMessage('begin')
  }
})