class GetWelcome < ActiveInteraction::Base
  def execute
    time = TimeService.new
    welcome = WelcomeSetting.where(day_name: time.day_index).first
    OpenStruct.new (
      {
        day_message: welcome.day_message,
        day_time: time.which_time.to_sym
      }
    )
  end
end