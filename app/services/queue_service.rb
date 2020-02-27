class QueueService
  attr_reader :jobs
  def initialize(queue_name)        
    @jobs = Sidekiq::Queue.new(queue_name).map do |job|
      JobInfo.new(job)
    end
  end

  def add_job(klass, sgid)
    jobs.push(JobInfo.new(klass.constantize.perform_later(sgid))) if jobs.select{ |job| job.include?(sgid) }.empty?
  end

  class JobInfo
    def initialize(job)
      @job_id = nil
      @job_klass = nil
      @job_id = job.jid if defined? job.jid
      @job_klass = job.klass if defined? job.kclass
      if defined? job.args
        @arguments = JSON.parse(job.args.first.to_json, object_class: OpenStruct)
      else
        @arguments = JSON.parse({
          arguments: job.arguments
        }.to_json, object_class: OpenStruct)
      end
    end

    def id
      @job_id
    end

    def klass
      @klass
    end

    def arguments
      @arguments.arguments
    end
  end
end