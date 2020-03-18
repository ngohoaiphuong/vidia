function checkUrlActive(urlName) {
  let href =  `${location.href}/`
  href.match(`/${urlName}/`) ? 'active' : ''
} 

function storeData() {
  return {
    get: function(key) {
    },
    put: function(key, value) {
    }  
  }
}

export {
  checkUrlActive, storeData
}