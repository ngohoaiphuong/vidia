# frozen_string_literal: true

class Api::BaseController < ActionController::API
  include JsonErrorHandler
  include JsonSuccessHandler

  include ActionController::MimeResponds

  def render_404
    head 404
  end

  def render_500(error_messages)
    render status: 500, json: {
      success: false,
      errors:  error_messages
    }
  end

  def render_422(error_messages)
    render status: 422, json: {
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

end
