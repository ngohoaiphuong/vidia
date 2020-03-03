class AddDeletedToActionManagement < ActiveRecord::Migration[6.0]
  def change
    add_column :action_managements, :deleted_at, :datetime
    add_index :action_managements, :deleted_at
  end
end
