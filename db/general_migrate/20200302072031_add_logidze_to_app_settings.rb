class AddLogidzeToAppSettings < ActiveRecord::Migration[5.0]
  require 'logidze/migration'
  include Logidze::Migration

  def up
    
    add_column :app_settings, :log_data, :jsonb
    

    execute <<-SQL
      CREATE TRIGGER logidze_on_app_settings
      BEFORE UPDATE OR INSERT ON app_settings FOR EACH ROW
      WHEN (coalesce(#{current_setting('logidze.disabled')}, '') <> 'on')
      EXECUTE PROCEDURE logidze_logger(null, 'updated_at');
    SQL

    
  end

  def down
    
    execute "DROP TRIGGER IF EXISTS logidze_on_app_settings on app_settings;"

    
    remove_column :app_settings, :log_data
    
    
  end
end
