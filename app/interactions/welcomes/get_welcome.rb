class GetWelcome < ActiveInteraction::Base
  def execute
    time = TimeService.new
    set_welcome_default if WelcomeSetting.count ==  0
  end

  private
  def set_welcome_default
    
  end
end