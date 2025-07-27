class Moderator::AuthController < Moderator::BaseController
  skip_before_action :authenticate_moderator!, only: [:login, :guest_login]

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

  def guest_login
    moderator = Moderator.find_by(email: 't-yamada@example.com')

    unless moderator
      render json: { error: 'ゲストユーザーが存在しません' }, status: :not_found and return
    end

    token = JsonWebToken.encode(moderator_id: moderator.id)
    set_jwt_cookie(token)

    render json: { moderator: moderator.as_json(except: [:password_digest]) }, status: :ok
  end

  def logout
    cookies.delete(:moderator_jwt, domain: :all, path: '/')
    render json: { message: "Logged out" }
  end

  private

  def set_jwt_cookie(token)
    cookies.signed[:moderator_jwt] = {
      value: token,
      httponly: true,
      secure: false,
      same_site: :lax,
      domain: :all,
      expires: 24.hours.from_now,
      path: '/'
    }
  end
end