class AddLogidzeToWelcomeSettings < ActiveRecord::Migration[5.0]
  require 'logidze/migration'
  include Logidze::Migration

  def up
    
    add_column :welcome_settings, :log_data, :jsonb
    

    execute <<-SQL
      CREATE TRIGGER logidze_on_welcome_settings
      BEFORE UPDATE OR INSERT ON welcome_settings FOR EACH ROW
      WHEN (coalesce(#{current_setting('logidze.disabled')}, '') <> 'on')
      EXECUTE PROCEDURE logidze_logger(null, 'updated_at');
    SQL

    
  end

  def down
    
    execute "DROP TRIGGER IF EXISTS logidze_on_welcome_settings on welcome_settings;"

    
    remove_column :welcome_settings, :log_data
    
    
  end
end
