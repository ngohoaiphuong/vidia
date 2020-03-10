class CrmController < ApplicationController
  before_action :authenticate_account!

  def index
    @customers = ListCustomer.run!
  end
end
