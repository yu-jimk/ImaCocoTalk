class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authenticate_user!

  private

  def current_user
    @current_user
  end

  def authenticate_user!
    token = cookies.signed[:jwt]
    return unauthorized unless token

    begin
      payload = JsonWebToken.decode(token)
      @current_user = User.find_by(id: payload["user_id"])
    rescue JWT::DecodeError, JWT::ExpiredSignature
      @current_user = nil
    end

    return unauthorized unless @current_user
  end

  def unauthorized
    render json: { error: "Unauthorized" }, status: :unauthorized
  end
end
