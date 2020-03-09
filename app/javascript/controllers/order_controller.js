import { Controller } from 'stimulus';

export default class extends Controller  {
  static link = ''

  connect() {
    console.log('order')
  }

  disconnect() {}

  initialize() {}
}