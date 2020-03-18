import { AddressService } from '../shared/storages/address_service'
import { RegionService } from '../shared/storages/region_service'

import { SyncLocalDBListening } from 'shared/local_listening'

function registerLocalStorage(worker) {
  // let addressService = new AddressService(worker)
  // let regionService = new RegionService()

  // setTimeout(addressService.run(), 1000)
  // setTimeout(regionService.run(), 1000)
  SyncLocalDBListening(
    target => {
      console.log('------------listening------------')
      console.log(target)
      console.log('---------------------------------')
    }
  )
}

export {
  registerLocalStorage
}