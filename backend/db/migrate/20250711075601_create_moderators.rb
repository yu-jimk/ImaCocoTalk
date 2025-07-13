class CreateModerators < ActiveRecord::Migration[7.1]
  def change
    create_table :moderators do |t|
      t.references :store, null: false, foreign_key: true
      t.string :email, null: false, index: { unique: true }
      t.string :password_digest, null: false

      t.timestamps
    end
  end
end
