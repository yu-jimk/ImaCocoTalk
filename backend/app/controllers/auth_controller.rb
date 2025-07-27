# app/controllers/auth_controller.rb
class AuthController < BaseController
  skip_before_action :authenticate_user!, only: [:signup, :login, :guest_login]

  def signup
    user = User.new(signup_params)
    if user.save
      token = JsonWebToken.encode(user_id: user.id)
      set_jwt_cookie(token)
      render json: { user: user.as_json(except: [:password_digest]) }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: user.id)
      set_jwt_cookie(token)
      render json: { user: user.as_json(except: [:password_digest]) }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def guest_login
    user = User.order(:id).first

    unless user
      render json: { error: 'ゲストユーザーが存在しません' }, status: :not_found and return
    end

    token = JsonWebToken.encode(user_id: user.id)
    set_jwt_cookie(token)

    render json: { user: user.as_json(except: [:password_digest]) }, status: :ok
  end

  def logout
    cookies.delete(:user_jwt, domain: :all, path: '/')
    render json: { message: "Logged out" }
  end

  private

  def signup_params
    params.fetch(:auth, params).permit(:name, :email, :password, :password_confirmation)
  end

  def set_jwt_cookie(token)
    cookies.signed[:user_jwt] = {
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
