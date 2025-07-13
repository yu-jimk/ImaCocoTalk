class LikesController < ApplicationController
  before_action :set_like, only: %i[ show update destroy ]

  # POST /likes/toggle
  def toggle
    post = Post.find(params[:post_id])
    like = current_user.likes.find_by(post: post)

    if like
      like.destroy
      render json: { status: 'unliked', post_id: post.id }
    else
      current_user.likes.create!(post: post)
      render json: { status: 'liked', post_id: post.id }
    end
  end

  # GET /likes
  def index
    @likes = Like.all

    render json: @likes
  end

  # GET /likes/1
  def show
    render json: @like
  end

  # POST /likes
  def create
    @like = Like.new(like_params)

    if @like.save
      render json: @like, status: :created, location: @like
    else
      render json: @like.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /likes/1
  def update
    if @like.update(like_params)
      render json: @like
    else
      render json: @like.errors, status: :unprocessable_entity
    end
  end

  # DELETE /likes/1
  def destroy
    @like.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_like
      @like = Like.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def like_params
      params.require(:like).permit(:user_id, :post_id)
    end
end
