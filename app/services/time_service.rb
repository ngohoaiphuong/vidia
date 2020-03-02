class TimeService
  def initialize
  end

  def is_morning?
    now.strftime('%p').downcase == 'am'
  end

  def is_noon?
    time = now.strftime('%p').downcase
    hour = now.strftime('%H').to_i
    return true if time == 'pm' && (12..17).include?(hour)
    false
  end

  def is_night?
    time = now.strftime('%p').downcase
    hour = now.strftime('%H').to_i
    return false if time == 'pm' && (12..17).include?(hour)
    true
  end

  def which_time
    return 'morning' if is_morning?
    return 'noon' if is_noon?
    'night'
  end

  def day_index
    now.wday
  end

  def day_name
    Date::DAYNAMES[day_index].downcase
  end

  private
  def now
    Time.zone.now
  end
end