class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.references :user, null: false, foreign_key: true
      t.references :store, null: false, foreign_key: true
      t.float :rating, null: false, default: 0.0
      t.text :content, null: false

      t.timestamps
    end
  end
end
