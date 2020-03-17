import { DbService } from './db_service'
const _  = require("lodash")

export class AddressService extends DbService {
  constructor() {
    super()
  }

  run = () => {
    this.exists().then (
      (alreadyExists: Boolean) => {
        if(alreadyExists) {
          // this.addresses.put({
          //   id: _.random(0, 100),
          //   name: `nhp-${_.random(0, 100)}`,
          //   code: 'Ngo Hoai Phuong',
          //   parent:  undefined,
          //   address_type: ''
          // })
        } else {
        }
      }
    )    
  }
}