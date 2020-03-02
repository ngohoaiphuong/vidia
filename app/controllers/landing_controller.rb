class LandingController < ApplicationController
  layout 'landing'
  
  def index
    @welcome = GetWelcome.run!
    
    respond_to do |format|
      format.html do |html|
        html.mobile
        html.tablet
      end
    end
  end
end
