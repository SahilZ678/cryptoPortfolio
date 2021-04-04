class CreateAssets < ActiveRecord::Migration[6.1]
  def change
    create_table :assets do |t|
      t.string :name
      t.string :symbol
      t.float :quantity
      t.date :purchased_date
      t.float :cost_price
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
