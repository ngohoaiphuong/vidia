require 'ostruct'
require 'json'

PASSWORD_DEFAULT='1234qwer'

ACCOUNT_ROLES = OpenStruct.new
roles = {
  customer: :customer,
  employee: :employee,
  accounting: :accounting
}.each { |key, value| ACCOUNT_ROLES[key] = value } 

LIMIT_RECORDS = 500