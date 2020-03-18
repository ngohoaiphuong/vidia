module JsonErrorHandler
  # Error types exposed to API error types.
  ERRORS = {
    param_error: { type: "param_error", status: 400 },
    invalid_auth: { type: "invalid_auth", status: 401 },
    not_authorized: { type: "not_authorized", status: 403 },
    endpoint_error: { type: "endpoint_error", status: 404 },
    method_not_allowed: { type: "method_not_allowed", status: 405 },
    locked: { type: 'locked', status: 423 },
    too_many_requests: { type: "too_many_requests", status: 429 },
    internal_errors: { type: "internal_errors", status: 500 },
    account_errors: { type: "account_errors", status: 500 }
  }.freeze

  # error render methods
  def render_param_error(message)
    render error_json(:param_error, message)
  end

  def render_unknown_param_value(field, value)
    message = I18n.t("api.failure.unknown_param_value") % {value: value, field: field}
    render error_json(:param_error, message)
  end

  def render_missing_required_params(parameter_missing_exception)
    param = parameter_missing_exception.param.to_s
    render error_json(
      :param_error,
      I18n.t('api.active_controller.parameter_missing') % { param: param })
  end

  def render_param_missing(param_names)
    render error_json(
      :param_error,
      I18n.t('api.active_controller.parameter_missing') % { param: param_names }
    )
  end

  def render_invalid_model(error_model, options = {})
    options[:data] ||= error_model
    error_message = I18n.t("api.failure.invalid_model_default")
    if error_model && error_model.errors.respond_to?(:full_messages)
      error_message = "#{error_model.class.name}: #{error_model.errors.full_messages.join(', ')}"
    end
    render error_json(:param_error, error_message, options)
  end

  def render_invalid_auth(message = I18n.t("api.failure.invalid_auth"))
    render error_json(:invalid_auth, message)
  end

  def render_unauthorized(message = I18n.t("api.failure.unauthorized"))
    render error_json(:not_authorized, message)
  end

  def render_endpoint_error(message = I18n.t("api.failure.endpoint_error"))
    render error_json(:endpoint_error, message)
  end

  def render_method_not_allowed(message = I18n.t("api.failure.method_not_allowed"))
    render error_json(:method_not_allowed, message)
  end

  def render_locked_user(message=nil)
    message ||= I18n.t("api.failure.locked_user")
    render error_json(:locked, message)
  end

  def render_too_many_requests(message = nil)
    message ||= I18n.t("api.failure.too_many_requests")
    render error_json(:too_many_requests, message)
  end

  def render_internal_errors(message = nil)
    message ||= I18n.t("api.failure.internal_errors")
    render error_json(:internal_errors, message)
  end

  def account_not_exists(account)
    render error_json(:account_errors, I18n.t("api.account.not_exists", {
      account: account
    }))
  end


  ### Manually render ERROR with message, status, status code and error_data
  def assign_fail(error_messages, status = nil, status_code = nil, error_data = {})
    status ||= 400
    status_code ||= "BAD_REQUEST"
    render status: status, json: {
      status: false,
      code: status_code,
      messages: error_messages,
      error_data: error_data
    }
  end


  protected

  # Return formated json for given error type.
  def error_json(type, message, options = {})
    # Raise error when developer call method with invalid error tpe.
    raise ErrorTypeMisMatch unless error = ERRORS[type.to_sym]

    options.reverse_merge(
      json: {
        status: error[:status],
        code: error[:type].upcase,
        message: message,
        error_data: options[:data],
        error: {
          type: error[:type],
          message: message,
          error_data: options[:data]
        }
      },
      status: error[:status]
    )
  end
end
