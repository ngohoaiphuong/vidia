import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ['total']
  connect() {
    console.log('welcome comment')
  }
  disconnect() {}
  initialize() {
    this.totalTarget.innerHTML = ''
  }
}