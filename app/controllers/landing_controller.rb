class LandingController < ApplicationController
  layout 'landing'
  
  def index
    respond_to do |format|
      format.html do |html|
        html.mobile
        html.tablet
      end
    end
  end
end
