class PostsController < BaseController
  before_action :set_post, only: %i[ show update destroy report ]

  # GET /posts/1
  def show
    @current_user = current_user
  end

  # POST /posts
  def create
    @post = Post.new(post_params)
    @post.user_id = current_user.id

    unless current_user.recently_checked_in_to?(@post.store_id)
      render json: { error: "この店舗にはチェックインしていません（または有効期限切れ）" }, status: :forbidden
      return
    end

    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    unless current_user.recently_checked_in_to?(@post.store_id)
      render json: { error: "この店舗にはチェックインしていません（または有効期限切れ）" }, status: :forbidden
      return
    end

    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy!
  end

  def report
    @report = @post.reports.new(user: current_user, reason: params[:reason])
  
    if @report.save
      render json: { message: '通報を受け付けました' }, status: :ok
    else
      render json: { error: @report.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:user_id, :store_id, :rating, :content)
    end
end
