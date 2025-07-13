class CreateAnnouncements < ActiveRecord::Migration[7.1]
  def change
    create_table :announcements do |t|
      t.references :store, null: false, foreign_key: true
      t.text :content, null: false

      t.timestamps
    end
  end
end
