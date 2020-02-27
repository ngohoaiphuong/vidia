class ClientJob < ApplicationJob
  include Rails.application.routes.url_helpers
  queue_as :channel

  def perform(sgid)
    client_channel = GlobalID::Locator.locate sgid
    send_request_change_password(client_channel) and return if client_channel.change_password?
    send_refresh_ui(client_channel) and return if client_channel.refresh_ui?
  end

  private
  def send_refresh_ui(client)
  end

  def send_request_change_password(client)
    account = client.account
    if !account.secure?
      ClientSystemChannel.broadcast_to account, {
        callback: authentication_secure_url(client.sgid)
      }
      client.sent!
    else
      client.done!
    end
  end
end
