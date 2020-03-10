import { Subject } from 'rxjs'

const modelChangeSub = new Subject()

export const LocalEventService = {
  modelChange: (target) => {
    modelChangeSub.next(target)
  },
  onModelChange: () => modelChangeSub.asObservable()
}