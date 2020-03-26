import { DbService } from './db_service'
import { ADDRESS_MODEL_NAME, DB_ACTION_SYNCING, DB_ACTION_DONE, INDEXDB_TYPE } from '../constant'
import { Addresses } from 'shared/api_service'

import { of, forkJoin, Observable, Subject, range, from, switchMap, defer, asyncScheduler } from 'rxjs'
import { mergeMap, map, concatMap, take, debounceTime } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import routes from 'shared/routes.js.erb'
import { Address } from './models/address'

const _  = require('lodash')

export class AddressService extends DbService {
  worker_ = undefined
  constructor(worker) {
    super()
    this.worker_ = worker
  }
  run = () => {
    // this.listenOnChange()
    this.exists().then (
      (alreadyExists: Boolean) => {
        if(alreadyExists) {
          this.fetch_()
          console.log('----------------count---------------------------')
          this.addresses.count().then(
            count => {
              console.log(count)
              if(count === 0) {
                // this.fetch()
              }
            }
          )
          console.log(this.addresses)
          this.addresses.toCollection().first().then(
            results => console.log(results)
          )
          this.addresses.where('addressId').equals(15546).toArray().then(
            result => console.log(result)
          ).catch(error => console.log(error))
          this.addresses.where({addressId: 15546}).toArray(
            result => {
              console.log(result)
            }
          ).catch(error => {
            console.error(error.stack || error);
          })
        } else {

        }
      }
    )    
  }

  private listenOnChange = () => {
    this.onDeleting()
    this.onCreating()
    this.onUpdating()
    this.onReading()
  }

  private onDeleting = () => {    
    this.addresses.hook('deleting', function (primKey, obj, trans) {
      // console.log('-----------------onDeleting')
      // console.log(primKey, obj, trans)
      // console.log('----------------------------')
    })
  }

  private onCreating = () => {    
    let self = this
    this.addresses.hook('creating', function (primKey, obj, trans) {
      // console.log('-----------------onCreating')
      // console.log(primKey, obj, trans)
      // console.log('----------------------------')
      // self.addressSyncing()
    })
  }

  private  onUpdating = () => {
    let self = this
    this.addresses.hook('updating', function (modifications, primKey, obj, trans) {
      // console.log('-----------------onUpdating')
      // console.log(modifications, primKey, obj, trans)
      // console.log('----------------------------')
      // self.addressSyncing()
    })
  }

  private onReading = () => {    
    this.addresses.hook('reading', function (obj) {
      // console.log('-----------------onReading')
      // console.log(obj)
      // console.log('----------------------------')
    })
  }

  private addressSyncing = () => {
    console.log(ADDRESS_MODEL_NAME, DB_ACTION_SYNCING)
    if(this.worker_) {
      this.worker_.postMessage({
        type: INDEXDB_TYPE,
        name: ADDRESS_MODEL_NAME,
        value: DB_ACTION_SYNCING
      })
    }
  }

  private Wards = (city, district) => {
    Addresses()(city)(district)().then(
      wards => {
        from(_.values(wards), asyncScheduler)
          .subscribe(ward => {
            console.log('Ward:', ward)
          })
      }
    )
  }

  private Districts = (city) => {
    let self = this
    Addresses()(city)().then(
      districts => {
        from(_.values(districts), asyncScheduler)
          .subscribe(district => {
            console.log('District:', district)
            if(district) {
              self.Wards(city, district.slug)
            }
          })
      }
    )
  }

  private Cities = () => {
    let self = this
    Addresses()().then(
      cities  => {
        from(_.values(cities), asyncScheduler)
          .subscribe(city => {
            console.log('City:', city)
            if(city) {
              self.Districts(city.slug)
            }
          })
      }
    )

    // from(Addresses()()).subscribe(
    //   resp => console.log(resp)
    // )
    // Observable.fromPromise(Addresses()())
    // Addresses()().then(
    //     cities => {
    //       of(_.values(cities))
    //         .subscribe(
    //           next => console.log('next:', next),
    //           err => console.log('error:', err),
    //           () => console.log('the end')              
    //         )
    //     }
    // )
  }

  workaround() {
  }

  fakeRequest(value) {
    console.log('start request:', value)
    return new Promise((resolve) => { 
      setTimeout(() => resolve(value), 1000);
   });
  }

  private get_addresses = (address) => {
    return new Promise(
      resolve => {
        ajax(address.url).subscribe(
          resp => resolve(resp.response)
        )    
      }
    )
  }

  private fetch_() {
    let self = this
    ajax(routes.api_addresses_summary_path()).pipe(
      mergeMap(
        resp => forkJoin(
          resp.response.cities.pagings.concat(
            resp.response.districts.pagings, 
            resp.response.wards.pagings
            ).map(self.get_addresses)
        )
      )
    ).subscribe(
      resp => {
        console.log('--------------------')
        console.log(resp)
        console.log('--------------------')
      }
    )
  }
  
  private fetch__() {
    let self = this
    // Addresses()().then(
    //   cities  => {
    //     from(Object.values(cities))
    //       .pipe(
    //         map(response => {
    //           return {
    //             ...response                
    //           }
    //         }),
    //         map(response => forkJoin(
    //           [response.slug].map(
    //             city => {
    //               return new Promise(
    //                 resolve => {
    //                   Addresses()(city)().then(
    //                     districts => {
    //                       resolve({
    //                         ...response,
    //                         districts: Object.values(districts)
    //                       })
    //                     }
    //                   )
    //                 }
    //               )
    //             }
    //           )
    //         )),
    //         map(
    //           response => forkJoin(
    //             [response].map(
    //               resp => {
    //                 return new Promise(
    //                   resolve => {
    //                     resp.subscribe(
    //                       address => {
    //                         address[0].districts.map(
    //                           district => {
    //                             Addresses()(address[0].slug)(district.slug)().then(
    //                               wards => {
    //                                 resolve({
    //                                   ...address[0],
    //                                   ...{
    //                                     wards: Object.values(wards)
    //                                   }
    //                                 })
    //                               }
    //                             )
    //                           }
    //                         )
    //                       }
    //                     )  
    //                   }
    //                 )
    //               }
    //             )
    //           )
    //         ),
    //         map(
    //           response => {
    //             response.subscribe(
    //               address => console.log(address[0])
    //             )
    //           }
    //         )
    //       )
    //       .subscribe(
    //       )
        // from(Object.values(cities)).subscribe(
        //   city => {
        //     console.log('City:', city)
        //   }
        // )
      // }
    // )

    // this.Cities()

    // Addresses()().then(
    //   cities  => {
    //     from(_.values(cities), asyncScheduler)
    //       .subscribe(city => {
    //         console.log('City:', city)
    //         if(city) {
    //           self.Districts(city.slug)
    //         }
    //       })
    //   }
    // )

    // ajax(routes.api_addresses_cities_path()).pipe(
    //   mergeMap(
    //     resp => forkJoin(
    //       ...resp.response.map(self.districtsByCity)
    //     )
    //   )
    // ).subscribe(
    //   resp => {
    //     resp.map(
    //       city => {
    //         console.log(city)
    //       }
    //     )
    //   }
    // )

  }

  getDistricts(cities) {
    // return {
    //   districts: _.mapValues(
    //    city => {
    //      return new Promise(
    //        Addresses()(city.slug)().then(
    //          district => {
    //            resolve(district)
    //          }
    //        )
    //      )
    //    }
    //   )
    // }
  }
  
  private fetch() {
    let self = this
    ajax(routes.api_addresses_cities_path()).pipe(
      mergeMap(
        resp => forkJoin(
          ...resp.response.map(self.districtsByCity)
        )
      )
    ).subscribe(
      resp => {
        resp.map(
          city => {
            self.insertItem(city).then(
              () => {
                self.saveDistricts(city.districts)
              }
            )
          }
        )
      }
    )
  }

  private districtsByCity = city =>  {
    let self = this
    return new Promise(resolve =>
      setTimeout(() => {
        Addresses()(city.slug)().then(
          resp => {
            let districts = _.values(resp)
            resolve({
              ...city,
              ...{
                districts: districts
                  .map(v => { return { ...v, ...{city: city.slug}}})
                  .map(v => { return { ...v, ...{
                    wards: self.wardsByDistrict(v)
                  }}})
              }    
            })      
          }
        ).catch(
          () => {
            resolve({   
              ...city,
              ...{
                districts: []
              } 
            })      
          }
        )
      }, 1000)
    )
  }  

  private wardsByDistrict = district => {
    return new Promise(resolve =>
      setTimeout(() => {
        Addresses()(district.city)(district.slug)().then(
          resp => {
            resolve(_.values(resp))      
          }
        ).catch(
          () => {
            resolve([])      
          }
        )
      }, 1000)
    )
  }

  private saveWards(wards) {
    let self = this
    wards.then(
      wards => {
        wards.map(
          ward => {
            self.insertItem(ward)
          }
        )
      }
    )
  }

  private saveDistricts(districts) {
    let self = this
    districts.map(
      district => {
        self.insertItem(district).then(
          () => {
            self.saveWards(district.wards)
          }
        )
      }
    )
  }

  private insertItem(data) {
    let address = new Address(
        data.id,
        data.code,
        data.address_type,
        data.name,
        data.parent_id
    )
    // console.log(data)
    // console.log(address)
    // console.log('--------------------------------------------------')
    return this.addresses.put(address)
  }
}