# == Schema Information
#
# Table name: app_settings
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class AppSetting < ApplicationRecord
  has_logidze
  connects_to database: { writing: :general, reading: :general }
  has_one :welcome_setting, dependent: :destroy
end
