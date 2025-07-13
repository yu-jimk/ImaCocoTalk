class CreateStores < ActiveRecord::Migration[7.1]
  def change
    create_table :stores do |t|
      t.string :name, limit: 100, null: false
      t.text :description
      t.string :postal_code, limit: 10
      t.string :address, limit: 255
      t.decimal :latitude, precision: 10, scale: 7, null: false
      t.decimal :longitude, precision: 10, scale: 7, null: false
      t.string :phone_number, limit: 20
      t.json :opening_hours
      t.json :place_types
      t.json :other_info

      t.timestamps
    end
  end
end
