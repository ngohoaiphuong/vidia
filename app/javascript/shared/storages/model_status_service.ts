import { DbService } from './db_service'
const _  = require("lodash")

export class ModelStatusService extends DbService {
  constructor() {
    super()
    this.listenOnChange()
  }

  listenOnChange = () => {
    this.onDeleting()
    this.onCreating()
    this.onUpdating()
    this.onReading()
  }

  onDeleting = () => {    
    this.model_statuses.hook('deleting', function (primKey, obj, trans) {
      console.log('-----------------onDeleting')
      console.log(primKey, obj, trans)
      console.log('----------------------------')
    })
  }

  onCreating = () => {    
    this.model_statuses.hook('creating', function (primKey, obj, trans) {
      console.log('-----------------onCreating')
      console.log(primKey, obj, trans)
      console.log('----------------------------')
    })
  }

  onUpdating = () => {    
    this.model_statuses.hook('updating', function (modifications, primKey, obj, trans) {
      console.log('-----------------onUpdating')
      console.log(modifications, primKey, obj, trans)
      console.log('----------------------------')
    })
  }

  onReading = () => {    
    this.model_statuses.hook('reading', function (obj) {
      console.log('-----------------onReading')
      console.log(obj)
      console.log('----------------------------')
    })
  }
  
  run = () => {
    this.exists().then (
      (alreadyExists: Boolean) => {
      }
    )    
  }
}