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

function signIn(authenticity_token, username, password) {
  return __post__(Routes.account_session_path(), {
    authenticity_token: authenticity_token,
    login_by: username.value,
    password: password.value
  })
}

function updateSecure(authenticity_token, account, password) {
  return __post__(Routes.authentications_path(), {
    authenticity_token: authenticity_token,
    account: account.value,
    password: password.value
  })
}

export {
  signIn,
  updateSecure
}