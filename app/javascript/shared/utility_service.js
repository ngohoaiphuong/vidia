function checkUrlActive(urlName) {
  let href =  `${location.href}/`

  href.match(`/${urlName}/`) ? 'active' : ''
} 

export {
  checkUrlActive
}