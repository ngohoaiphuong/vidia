class RemoveParentIdFromAddress < ActiveRecord::Migration[6.0]
  def change
    remove_column :addresses, :parent_id
  end
end
