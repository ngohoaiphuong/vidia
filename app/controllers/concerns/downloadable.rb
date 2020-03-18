module Downloadable
  extend ActiveSupport::Concern

  def save2local(args={})
    send_file args[:filepath]
  end

end
