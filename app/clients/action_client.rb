class ActionClient
  class << self
    def must_change_password(account)
      if ActionManagement.change_password.waitting.by_account(account).first.nil?
        new_request(account, ActionManagement::actions[:change_password]) 
      end
    end

    private
    def new_request(account, action)
      ActionManagement.create(account_id: account, action: action)
    end
  end
end