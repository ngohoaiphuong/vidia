export class Address {
  id: number
  code: string
  address_type: string
  name: string
  parent: number

  constructor(item: any) {
    this.id = item.id
    this.code = item.code
    this.address_type = item.address_type
    this.name = item.name
    this.parent = item.parent_id
  }
}
