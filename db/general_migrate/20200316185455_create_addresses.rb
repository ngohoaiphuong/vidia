class CreateAddresses < ActiveRecord::Migration[6.0]
  def change
    create_table :addresses do |t|
      t.integer :address_type, default: 0
      t.string :code
      t.string :name
      t.integer :ghtk_id
      t.integer :parent_id

      t.timestamps
    end
  end
end
