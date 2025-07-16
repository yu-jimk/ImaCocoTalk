class Moderator::AuthController < Moderator::BaseController
  skip_before_action :authenticate_moderator!, only: [:login]

  def login
    moderator = Moderator.find_by(email: params[:email])
    if moderator&.authenticate(params[:password])
      token = JsonWebToken.encode(moderator_id: moderator.id)
      set_jwt_cookie(token)
      render json: { moderator: moderator.as_json(except: [:password_digest]) }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def logout
    cookies.delete(:moderator_jwt)
    render json: { message: "Logged out" }
  end

  private

  def set_jwt_cookie(token)
    cookies.signed[:moderator_jwt] = {
      value: token,
      httponly: true,
      secure: false,
      same_site: :lax,
      expires: 24.hours.from_now,
    }
  end
end