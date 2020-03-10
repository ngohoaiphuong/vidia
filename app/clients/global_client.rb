class GlobalClient
  GLOBALKEY_VIEW = 'data-view'
  class << self
    def to_global(record)
      record.to_sgid(for: GLOBALKEY_VIEW).to_s
    end

    def phone(global_data)
      to_model(global_data)&.phone_number || nil
    end

    def model(global_data)
      to_model global_data
    end
  
    private
    def to_model(global_data)
      GlobalID::Locator.locate_signed global_data, for: GLOBALKEY_VIEW
    end  
  end
end