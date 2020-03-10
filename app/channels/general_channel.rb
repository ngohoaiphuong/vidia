class GeneralChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'general-channel'
  end

  def unsubscribed
    stop_all_streams
  end
end
