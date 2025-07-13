class CreateCheckIns < ActiveRecord::Migration[7.1]
  def change
    create_table :check_ins do |t|
      t.references :user, null: false, foreign_key: true
      t.references :store, null: false, foreign_key: true
      t.decimal :latitude, precision: 10, scale: 7, null: true
      t.decimal :longitude, precision: 10, scale: 7, null: true
      t.string :qr_token, limit: 64, null: false

      t.timestamps
    end
  end
end
