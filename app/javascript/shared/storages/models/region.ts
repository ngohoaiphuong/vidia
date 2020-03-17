export class Region {
  id: number
  name: string
  description: string

  constructor(item: any) {
    this.id = item.id
    this.description = item.description
    this.name = item.name
  }
}
