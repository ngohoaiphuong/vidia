# == Schema Information
#
# Table name: app_settings
#
#  id         :bigint           not null, primary key
#  deleted_at :datetime
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_app_settings_on_deleted_at  (deleted_at)
#

class AppSetting < ApplicationRecord
  has_logidze
  acts_as_paranoid
  connects_to database: { writing: :general, reading: :general_replica }
  has_one :welcome_setting, dependent: :destroy
end
