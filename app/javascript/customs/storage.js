import { AddressService } from '../shared/storages/address_service'
import { RegionService } from '../shared/storages/region_service'

function registerLocalStorage() {
  let addressService = new AddressService()
  let regionService = new RegionService()

  addressService.run()
  regionService.run()
}

export {
  registerLocalStorage
}