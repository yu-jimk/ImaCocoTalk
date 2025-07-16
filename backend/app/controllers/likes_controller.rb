class LikesController < BaseController

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
  
end
