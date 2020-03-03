class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :phone_number
      t.string :address
      t.integer :sex
      t.string :fullname

      t.timestamps
    end
  end
end
