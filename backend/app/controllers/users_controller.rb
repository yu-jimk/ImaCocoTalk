class UsersController < BaseController
  # before_action :set_user, only: %i[ show update destroy ]

  # GET /users/me
  def me
    @user = current_user
  end

  # PATCH /users/me
  def update_me
  end

  # DELETE /users/me
  def destroy_me
  end

  # GET /users/me/posts
  def my_posts
    posts = current_user.posts.includes(:user, :store, :likes).order(created_at: :desc)
    render 'users/my_posts', locals: { posts: posts }
  end

  # GET /users/me/check_ins
  def my_check_ins
    @check_ins = current_user.check_ins.includes(:store).order(created_at: :desc)
  end

  # GET /users/me/favorites
  def my_favorites
    stores = current_user.favorite_stores.includes(:check_ins)
    render :my_favorites, locals: { stores: stores }
  end

  # GET /users/me/likes
  def my_likes
    posts = current_user.liked_posts.includes(:user, :store)
    render :my_likes, locals: { posts: posts }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:name, :email, :password_digest, :bio)
    end
end
