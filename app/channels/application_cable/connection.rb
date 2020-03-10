module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_account

    def connect
      self.current_account = find_verified_account
    end

    protected

    def find_verified_account
      reject_unauthorized_connection and return if env['warden'].nil? || env['warden'].user.nil?
      env['warden'].user
    end
  end
end
