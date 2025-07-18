class PostsController < BaseController
  before_action :set_post, only: %i[ show update destroy report ]

  # GET /posts/1
  def show
    render json: @post
  end

  # POST /posts
  def create
    @post = Post.new(post_params)

    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
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
