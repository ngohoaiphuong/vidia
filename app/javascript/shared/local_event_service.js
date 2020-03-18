import { Subject } from 'rxjs'
import { SYNC_DATA } from 'shared/constant'

const modelChangeSub = new Subject()
const syncLocalDBSub = new Subject()

export const LocalEventService = {
  modelChange: (target) => {
    modelChangeSub.next(target)
  },
  onModelChange: () => modelChangeSub.asObservable(),
  needSyncData: (target) => {
    syncLocalDBSub.next(target)
  },
  onRequestSyncData: () => syncLocalDBSub.asObservable()
}