export class ModelStatus {
  id: number
  name: string
  status_: number

  constructor(item: any) {
    this.id = item.id
    this.name = item.name
    this.status_ = item.status
  }

  set status(status_: number) {
    this.status_ = status_
  }

  get status() {
    return this.status_
  }
}
