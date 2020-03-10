import createChannel from './cable'
import { LocalEventService } from 'shared/local_event_service'

function registerGeneralChannel() {
  createChannel({
      channel: 'GeneralChannel'
    }, {
    connected() {
      console.log('[System]', 'General channel connected!')
      // Called when the subscription is ready for use on the server
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(response) {
      if(response.hasOwnProperty('changed')) {
        console.log(response)
        LocalEventService.modelChange(response.changed)
      }
      // Called when there's incoming data on the websocket for this channel
    }
  })
}

export {
  registerGeneralChannel
}