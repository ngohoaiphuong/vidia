export class Address {
  id?: number
  addressId: number
  code: string
  addressType: string
  name: string
  parentId: number

  constructor(addressId: number, code: string, addressType: string, name: string, parentId: number) {
    this.addressId = addressId
    this.code = code
    this.addressType = addressType
    this.name = name
    this.parentId = parentId
  }
}
