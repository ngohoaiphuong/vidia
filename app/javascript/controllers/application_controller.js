import { Controller } from 'stimulus';

export default class extends Controller {
  connect() {
    console.log('---------------------------')
    console.log('Application')
    console.log('---------------------------')
  }
  disconnect() {}
  initialize() {}
}
