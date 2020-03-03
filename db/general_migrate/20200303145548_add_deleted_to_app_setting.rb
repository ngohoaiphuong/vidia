class AddDeletedToAppSetting < ActiveRecord::Migration[6.0]
  def change
    add_column :app_settings, :deleted_at, :datetime
    add_index :app_settings, :deleted_at
  end
end
