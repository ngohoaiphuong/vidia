class ListCustomer < ActiveInteraction::Base
  def execute
    # accounts = Account.with_role(customer)
    accounts = Account.order(:created_at, :username)
    OpenStruct.new (
      {
        data: accounts
      }
    )
  end

  private
  def customer
    ACCOUNT_ROLES.customer
  end
end