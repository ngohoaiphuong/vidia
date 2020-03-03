class AddDeletedToWelcomeSetting < ActiveRecord::Migration[6.0]
  def change
    add_column :welcome_settings, :deleted_at, :datetime
    add_index :welcome_settings, :deleted_at
  end
end
