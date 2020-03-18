# frozen_string_literal: true

class Api::CoreBaseController < ActionController::Base
  include JsonErrorHandler
  include JsonSuccessHandler

  respond_to :json
  before_action :set_default_response_format

  # Enable CSRF protection for API
  protect_from_forgery with: :null_session

  acts_as_token_authentication_handler_for User, fallback_to_devise: false
  before_action :authenticate_api_account!

  rescue_from 'ActionController::ParameterMissing' do |exception|
    render_missing_required_params(exception)
  end

  rescue_from 'ActionController::UnpermittedParameters' do |_exception|
    render_param_error( I18n.t("api.failure.unpermitted_parameters") )
  end

  rescue_from 'ActiveRecord::RecordNotFound' do |_exception|
    render_endpoint_error
  end

  rescue_from 'ArgumentError' do |_exception|
    render_param_error(_exception.try(:message))
  end

  protected
  def render_404
    head 404
  end

  def render_500(error_messages)
    render status: 500, json: {
      success: false,
      errors:  error_messages
    }
  end

  def render_200(data={})
    render status: 200, json: {
      status: "success",
      data: data
    }
  end

  def set_default_response_format
    request.format = :json
  end

  def require_params(param_name, param_list=nil)
    if param_list.nil? && params[param_name].nil?
      raise ActionController::ParameterMissing.new(param_name)
    end

    if param_list.present? && !params[param_list][param_name].present?
      raise ActionController::ParameterMissing.new(param_name)
    end
  end

  def validate_date(param_name)
    begin
      params[param_name].try(:to_date)
    rescue ArgumentError => e
      message = I18n.t('api.failure.invalid_param_value') % { param_name: param_names }
      raise ArgumentError, message
    end
  end

  def authenticate_api_account!
    phone = request.headers['HTTP_X_USER_PHONE']
    token = request.headers['HTTP_X_USER_TOKEN']

    render_invalid_auth and return if !token.present?
    render_param_error(I18n.t("api.failure.phone")) and return if !phone.present?

    user = User.already_and_logining(phone, token)

    render_unauthorized and return if user.nil?
  end
end
