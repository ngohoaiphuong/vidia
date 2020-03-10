import { LocalEventService } from './local_event_service'

function LocalListening(self_target, callback) {
  LocalEventService.onModelChange().subscribe(
    {
      next: target => {
        if(target === self_target && callback) {
          callback()
        }
      }
    }
  )
}

export {
  LocalListening
}