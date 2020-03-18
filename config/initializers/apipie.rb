Apipie.configure do |config|
  config.validate                = false
  config.translate               = false
  config.default_locale          = nil
  config.app_name                = "Vidia"
  config.api_base_url            = "/api"
  config.doc_base_url            = "/apis/doc"
  # where is your API defined?
  config.api_controllers_matcher = "#{Rails.root}/app/controllers/**/*.rb"
  config.authenticate = Proc.new do
    authenticate_or_request_with_http_basic do |username, password|
      username == "apiadmin" && password == "1234qwer"
   end
 end
end