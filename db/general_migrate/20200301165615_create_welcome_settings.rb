class CreateWelcomeSettings < ActiveRecord::Migration[6.0]
  def change
    create_table :welcome_settings do |t|
      t.integer :day_name
      t.string :day_message
      t.integer :app_setting_id

      t.timestamps
    end
  end
end
