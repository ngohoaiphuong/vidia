class AddSlugToAddress < ActiveRecord::Migration[6.0]
  def change
    add_column :addresses, :slug, :string
    add_index :addresses, :slug, unique: true
  end
end
