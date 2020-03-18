import Worker from '../shared/workers/app.worker.js'
import { INDEXDB_TYPE, SYNC_DATA } from 'shared/constant'
import { registerLocalStorage } from './storage'
import { LocalEventService } from 'shared/local_event_service'
const cookie = require('js-cookie')

function registerWorkers() {
  let w = new Worker()
  w.postMessage({type: 'connected'})
  w.onmessage = (event) => {
    if(typeof(event.data) === 'object' && event.data.hasOwnProperty('type') && event.data.type === INDEXDB_TYPE) {
      console.log('-----------------------')
      console.log(event.data)
      console.log('-----------------------')
      cookie.set(event.data.name, event.data.value)
    }
    if(typeof(event.data) === 'string' && event.data === 'begin') {
      LocalEventService.needSyncData('addresses')
      // registerLocalStorage(event.self)      
    }
  }
}

export {
  registerWorkers
}