class Moderator::BaseController < ApplicationController
  before_action :authenticate_moderator!

  private

  def current_moderator
    @current_moderator
  end

  def authenticate_moderator!
    token = cookies.signed[:moderator_jwt]
    return unauthorized unless token

    begin
      payload = JsonWebToken.decode(token)
      @current_moderator = Moderator.find_by(id: payload["moderator_id"])
    rescue JWT::DecodeError, JWT::ExpiredSignature
      @current_moderator = nil
    end

    return unauthorized unless @current_moderator
  end

  def unauthorized
    render json: { error: "Unauthorized" }, status: :unauthorized
  end
end

