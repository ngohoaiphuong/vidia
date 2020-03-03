# == Schema Information
#
# Table name: welcome_settings
#
#  id             :bigint           not null, primary key
#  day_message    :string
#  day_name       :integer
#  deleted_at     :datetime
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  app_setting_id :integer
#
# Indexes
#
#  index_welcome_settings_on_deleted_at  (deleted_at)
#

class WelcomeSetting < ApplicationRecord
  has_logidze
  acts_as_paranoid
  connects_to database: { writing: :general, reading: :general }
  belongs_to :app_setting, dependent: :destroy, required: false
  store :day_message, accessors: [ :morning , :noon , :night ]
end
