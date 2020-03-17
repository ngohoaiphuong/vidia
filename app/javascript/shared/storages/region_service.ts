import { DbService } from './db_service'
const _  = require("lodash")

export class RegionService extends DbService {
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
    this.regions.hook('deleting', function (primKey, obj, trans) {
      console.log('-----------------onDeleting')
      console.log(primKey, obj, trans)
      console.log('----------------------------')
    })
  }

  onCreating = () => {    
    this.regions.hook('creating', function (primKey, obj, trans) {
      console.log('-----------------onCreating')
      console.log(primKey, obj, trans)
      console.log('----------------------------')
    })
  }

  onUpdating = () => {    
    this.regions.hook('updating', function (modifications, primKey, obj, trans) {
      console.log('-----------------onUpdating')
      console.log(modifications, primKey, obj, trans)
      console.log('----------------------------')
    })
  }

  onReading = () => {    
    this.regions.hook('reading', function (obj) {
      console.log('-----------------onReading')
      console.log(obj)
      console.log('----------------------------')
    })
  }
  
  run = () => {
    this.exists().then (
      (alreadyExists: Boolean) => {
        if(alreadyExists) {
          // this.regions.put({
          //   id: _.random(0, 100),
          //   name: `nhp-${_.random(0, 100)}`,
          //   description: 'Ngo Hoai Phuong'
          // })
        } else {
        }
      }
    )    
  }
}