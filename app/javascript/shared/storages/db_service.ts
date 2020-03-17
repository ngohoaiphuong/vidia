import Dexie from 'dexie'
import 'dexie-observable'

import { Address } from './models/address'
import { Region } from './models/region'
import { ModelStatus } from './models/model_status'

const _  = require('lodash')
const APP_MAIN_DB = 'app-db-test'

export class DbService extends Dexie {
  private _regions: Dexie.Table<Region, 1>
  private _addresses: Dexie.Table<Address, 1>
  private _model_statuses: Dexie.Table<Address, 1>

  constructor() {
    super(APP_MAIN_DB)
    this.mapStore()
  }

  private mapStore() {
    // just to storages data from server
    this.version(1).stores({
      _regions: '++id, name, description',
      _addresses: '++id, code, address_type, name, parent',
      _model_statuses: '++id, name, status'
    })
    this.mapClass()
  }

  private mapClass = () => {
    this._regions.mapToClass(Region)
    this._addresses.mapToClass(Address)
    this._model_statuses.mapToClass(ModelStatus)
    this.listenOnChanges()
    this.open()
  }

  private listenOnChanges = () => {
    this.on('changes', (changes) => {
      changes.forEach((change: any) => {
        switch (change.type) {
          // CREATED
          case 1:
            console.log('listenOnChanges_ An object was created: ' + JSON.stringify(change.obj));
            break;

          // UPDATED
          case 2:
            console.log('listenOnChanges_ An object with key ' + change.key + ' was updated with modifications: ' + JSON.stringify(change.mods));
            break;

          // DELETED
          case 3:
            console.log('listenOnChanges_ An object was deleted: ' + JSON.stringify(change.oldObj));
            break;
        }
      });
    })
  }

  exists = () => {
    return Dexie.exists(APP_MAIN_DB)
  }
  
  get regions() {
    return this._regions
  }

  get addresses() {
    return this._addresses
  }

  get modelStatuses() {
    return  this._model_statuses
  }
}