class ChangeQrTokenLimitOnCheckIns < ActiveRecord::Migration[7.1]
  def change
    change_column :check_ins, :qr_token, :string, limit: 255
  end
end
