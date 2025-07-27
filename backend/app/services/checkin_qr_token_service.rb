require 'jwt'

class CheckinQrTokenService
  
  SECRET_KEY = Rails.application.secret_key_base
  EXPIRY_SECONDS = 30.minutes

  # JWT発行
  def self.issue(store_id)
    cache_key = "checkin_qr_token:store_id:#{store_id}"

    # キャッシュがあれば再利用
    token = Rails.cache.read(cache_key)
    return token if token.present?

    # なければ新規発行してキャッシュに保存
    payload = {
      store_id: store_id,
      exp: EXPIRY_SECONDS.from_now.to_i
    }
    token = JWT.encode(payload, SECRET_KEY, 'HS256')

    Rails.cache.write(cache_key, token, expires_in: EXPIRY_SECONDS)
    token
  end

  # JWT検証
  def self.decode_token(token)
    JWT.decode(token, SECRET_KEY, true, algorithm: 'HS256').first
  rescue JWT::ExpiredSignature, JWT::DecodeError
    nil
  end

  # storeとtokenが一致するかチェック
  def self.valid?(store, token)
    payload = decode_token(token)
    payload && payload["store_id"].to_s == store.id.to_s
  end
end
