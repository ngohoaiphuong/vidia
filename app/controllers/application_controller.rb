class ApplicationController < ActionController::Base
  include Pagy::Backend

  around_action :set_locale
  before_action :set_variant, :set_current_account, :check_secure_account

  layout :detect_layout

  respond_to :html, :js

  def respond_modal_with(*args, &blk)
    options = {}
    options[:responder] = ModalResponder
    respond_with *args, options, &blk
  end

  private
  def set_locale(&action)
    locale = params[:locale] || I18n.default_locale || :vi
    I18n.with_locale(locale, &action)
  end

  def set_variant
    response.set_header('vary', 'User-Agent')

    if is_mobile?
      request.variant = :mobile
    elsif is_ipad?
      request.variant = :ipad
    elsif is_tablet?
      request.variant = :tablet
    end
  end

  def is_mobile?
    browser.device.mobile?
  end

  def is_ipad?
    browser.device.ipad?
  end

  def is_tablet?
    browser.device.tablet?
  end

  def detect_layout
    [
      :mobile
    ].each {|device| return 'application.mobile' if request.variant.include?(device)}

    'application'
  end

  def set_current_account
    @current_account = current_account || nil
  end

  def check_secure_account
    ActionClient.must_change_password(current_account.id) if current_account && !current_account.secure?
  end

end
