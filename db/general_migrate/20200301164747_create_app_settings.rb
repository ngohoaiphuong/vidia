class CreateAppSettings < ActiveRecord::Migration[6.0]
  def change
    create_table :app_settings do |t|
      t.timestamps
    end
  end
end
