class AddLogidzeToAccounts < ActiveRecord::Migration[6.0]
  require 'logidze/migration'
  include Logidze::Migration

  def up
    
    add_column :accounts, :log_data, :jsonb
    

    execute <<-SQL
      CREATE TRIGGER logidze_on_accounts
      BEFORE UPDATE OR INSERT ON accounts FOR EACH ROW
      WHEN (coalesce(#{current_setting('logidze.disabled')}, '') <> 'on')
      EXECUTE PROCEDURE logidze_logger(null, 'updated_at');
    SQL

    
  end

  def down
    
    execute "DROP TRIGGER IF EXISTS logidze_on_accounts on accounts;"

    
    remove_column :accounts, :log_data
    
    
  end
end
