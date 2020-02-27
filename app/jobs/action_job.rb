class ActionJob < ApplicationJob
  queue_as :channel

  def perform(*args)
    queue = QueueService.new('channel')
    client_actions = ActionManagement.sent_wait_response
    client_actions.each do |client|
      queue.add_job('ClientJob', client.to_global_id.to_s)
    end
    ActionJob.set(wait_until: Time.now + 5.minutes).perform_later
  end
end
