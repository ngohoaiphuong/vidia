# == Schema Information
#
# Table name: welcome_settings
#
#  id             :bigint           not null, primary key
#  day_message    :string
#  day_name       :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  app_setting_id :integer
#

class WelcomeSetting < ApplicationRecord
  has_logidze
  connects_to database: { writing: :general, reading: :general }
  belongs_to :app_setting, dependent: :destroy
  store :day_message, accessors: [ :morning , :noon , :night ]
end
