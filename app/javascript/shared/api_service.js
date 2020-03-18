import routes from 'shared/routes.js.erb'

function __post__(url, parameters) {
  return new Promise((resolve, reject) => {
    $.post(url, parameters)
      .always(function () {
      })
      .fail(function (data) {
        reject({
          ...{
            success: false,
          },
          ...data.responseJSON
        })
      })
      .done(function (response) {
        resolve({
          ...{
            success: true,
          },
          ...response
        })
      })
  })
}

function __get__(url) {
  return new Promise((resolve, reject) => {
    // $.get(url, response => {
    //   resolve({
    //     ...{
    //       success: true
    //     },
    //     ...response
    //   })
    // }).fail(e => {
    //   console.log(e)
    //   reject({
    //     ...{
    //       success: false,
    //     },
    //     ...e.responseJSON
    //   })
    // })
    ___fetch___(url, resolve, reject)
  })
}

function ___fetch___(url, resolve, reject) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if (xhr.status === 200) {
      resolve({
        ...{
          success: true
        },
        ...JSON.parse(xhr.response)
      })
    } else {
      reject({
        ...{
          success: false,
        },
        ...xhr.statusText
      })
    }
  };

  xhr.send();
}

function signIn(authenticity_token, username, password) {
  return __post__(routes.account_session_path(), {
    authenticity_token: authenticity_token,
    login_by: username.value,
    password: password.value
  })
}

function updateSecure(authenticity_token, account, password) {
  return __post__(routes.authentications_path(), {
    authenticity_token: authenticity_token,
    account: account.value,
    password: password.value
  })
}

function Customers() {
  return __get__(routes.crm_index_path('json'))
}

/*
Function Addresses - get information city, district, ward from any address
Input: string | object
Output: Promise
----------------------------------------------------------
Trong đó:
  string: 1 chuỗi bất kỳ: tp-ho-chi-minh, quan-1, ...
  object: theo định dạng { name: <string> }
----------------------------------------------------------  
Get all cities information:
  Addresses()()
Get Ho Chi Minh city information:
  Addresses()(
    {
      name: 'tp-ho-chi-minh'
    }
  )
----------------------------------------------------------
Get all districts information from any city:
  Addresses()('tp-ho-chi-minh')()
Get information Quan1 district:
  Addresses()('tp-ho-chi-minh')(
    {
      name: 'quan-1'
    }
  )
----------------------------------------------------------
Get all wards of Quan1 district
  Addresses()('tp-ho-chi-minh')('quan-1')()
Get information about BenNghe ward from Quan1 district
  Addresses()('tp-ho-chi-minh')('quan-1')(
    {
      name: 'phuong-ben-nghe'
    }
  )
*/
function Addresses() {
  return function (city) {
    if (!city) {
      return __get__(routes.api_addresses_cities_path())
    }
    if (typeof (city) === 'object') {
      return __get__(routes.api_addresses_city_path(city.name))
    }
    return function (district) {
      if (!district) {
        return __get__(routes.api_addresses_city_districts_path(city))
      }
      if (typeof (district) === 'object') {
        return __get__(routes.api_addresses_city_district_path(city, district.name))
      }
      return function (ward) {
        if (!ward) {
          return __get__(routes.api_addresses_city_district_wards_path(city, district))
        }
        return __get__(routes.api_addresses_city_district_ward_path(city, district, ward.name))
      }
    }
  }
}

export {
  signIn,
  updateSecure,
  Customers,
  Addresses
}