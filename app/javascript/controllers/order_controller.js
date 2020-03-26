import { Controller } from 'stimulus';

const _ = require('lodash')

export default class extends Controller  {
  static link = ''

  connect() {
    // ajax(routes.api_addresses_cities_path()).pipe(
    //   tap(resp => {
    //     console.log('-----------tap-01---------------')
    //     console.log(resp)        
    //     console.log('--------------------------------')
    //   }),
    //   map(resp => {
    //     console.log('-----------map---------------')
    //     let cities = []
    //     _.forEach(resp.response, city => {
    //       cities.push({
    //         ...city,
    //         ...{
    //           districts: ajax(
    //             routes.api_addresses_city_districts_path(city.slug)
    //           ).pipe()
    //         }
    //       })
    //     })
    //     console.log(cities)
    //     return {
    //       cities: resp.response
    //     }
    //   }),
    //   tap(resp => {
    //     console.log('-----------tap-02---------------')
    //     console.log(resp)
    //     console.log('--------------------------------')
    //   })
    // ).subscribe(
    //   res => {
    //     console.log('-------------------')
    //     console.log(res)
    //     console.log('-------------------')
    //   }
    // )
    // let result = Observable.from(routes.api_addresses_cities_path()).pipe(
    //   mergeMap(
    //     c_response => {
    //       console.log(c_response.response)
    //       return of(c_response.response.data)
    //     }
    //   )
    // )
    // result.subscribe(
    //   res => {
    //     console.log(res)
    //   }
    // )
  }

  disconnect() {}

  initialize() {}
}