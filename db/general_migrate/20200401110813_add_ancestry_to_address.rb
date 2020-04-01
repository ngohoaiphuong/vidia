class AddAncestryToAddress < ActiveRecord::Migration[6.0]
  def change
    add_column :addresses, :ancestry, :string
    add_index :addresses, :ancestry
  end
end
