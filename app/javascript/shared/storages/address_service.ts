import { DbService } from './db_service'
import { ADDRESS_MODEL_NAME, DB_ACTION_SYNCING, DB_ACTION_DONE, INDEXDB_TYPE } from '../constant'
import { Addresses } from 'shared/api_service'

const _  = require('lodash')

export class AddressService extends DbService {
  worker_ = undefined
  constructor(worker) {
    super()
    this.worker_ = worker
    this.listenOnChange()
  }

  listenOnChange = () => {
    this.onDeleting()
    this.onCreating()
    this.onUpdating()
    this.onReading()
  }

  onDeleting = () => {    
    this.addresses.hook('deleting', function (primKey, obj, trans) {
      console.log('-----------------onDeleting')
      console.log(primKey, obj, trans)
      console.log('----------------------------')
    })
  }

  onCreating = () => {    
    let self = this
    this.addresses.hook('creating', function (primKey, obj, trans) {
      console.log('-----------------onCreating')
      console.log(primKey, obj, trans)
      console.log('----------------------------')
      self.addressSyncing()
    })
  }

  onUpdating = () => {
    let self = this
    this.addresses.hook('updating', function (modifications, primKey, obj, trans) {
      console.log('-----------------onUpdating')
      console.log(modifications, primKey, obj, trans)
      console.log('----------------------------')
      self.addressSyncing()
    })
  }

  onReading = () => {    
    this.addresses.hook('reading', function (obj) {
      console.log('-----------------onReading')
      console.log(obj)
      console.log('----------------------------')
    })
  }

  addressSyncing = () => {
    console.log(ADDRESS_MODEL_NAME, DB_ACTION_SYNCING)
    if(this.worker_) {
      this.worker_.postMessage({
        type: INDEXDB_TYPE,
        name: ADDRESS_MODEL_NAME,
        value: DB_ACTION_SYNCING
      })
    }
  }
  
  run = () => {
    this.exists().then (
      (alreadyExists: Boolean) => {
        if(alreadyExists) {
          this.fetch()
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
  private fetch() {
    let self = this
    Addresses()().then(
      (response: any) => {
        console.log('cities')
        console.log(response.data)
        console.log('-------------------------------')
      }
    ).catch(
      (error: any) => {
        console.log(error)
      }
    )
  }
}