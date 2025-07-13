class ModeratorsController < ApplicationController
  before_action :set_moderator, only: %i[ show update destroy ]

  # GET /moderators
  def index
    @moderators = Moderator.all

    render json: @moderators
  end

  # GET /moderators/1
  def show
    render json: @moderator
  end

  # POST /moderators
  def create
    @moderator = Moderator.new(moderator_params)

    if @moderator.save
      render json: @moderator, status: :created, location: @moderator
    else
      render json: @moderator.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /moderators/1
  def update
    if @moderator.update(moderator_params)
      render json: @moderator
    else
      render json: @moderator.errors, status: :unprocessable_entity
    end
  end

  # DELETE /moderators/1
  def destroy
    @moderator.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_moderator
      @moderator = Moderator.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def moderator_params
      params.require(:moderator).permit(:store_id, :email, :password_digest)
    end
end
