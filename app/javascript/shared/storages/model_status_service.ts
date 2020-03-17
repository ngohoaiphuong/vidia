import { DbService } from './db_service'
const _  = require("lodash")

export class ModelStatusService extends DbService {
  run = () => {
    this.exists().then (
      (alreadyExists: Boolean) => {
      }
    )    
  }
}