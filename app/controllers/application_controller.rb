class ApplicationController < ActionController::Base
  before_action :set_variant
  layout :detect_layout

  respond_to :html, :js

  def respond_modal_with(*args, &blk)
    options = {}
    options[:responder] = ModalResponder
    respond_with *args, options, &blk
  end

  private
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
end
