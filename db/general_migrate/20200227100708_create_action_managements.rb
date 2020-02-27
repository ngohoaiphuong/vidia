class CreateActionManagements < ActiveRecord::Migration[6.0]
  def change
    create_table :action_managements do |t|
      t.integer :account_id
      t.integer :action
      t.boolean :sent, default: false
      t.boolean :received, default: false
      t.integer :sent_counter, default: 0
      t.string :targets, array: true, default: []

      t.timestamps
    end
  end
end
