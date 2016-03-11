class CommentsController < ApplicationController
  before_action :set_chat_room, only: [:index, :create]

  def index
    render json: policy_scope(@chat_room.comments).limit(10).ordered, status: 200
  end

  def create
    comment = @chat_room.comments.build(comment_params)
    authorize comment
    if comment.save
      render json: comment, status: 201
    else
      render json: comment.errors.full_messages
    end
  end

  private

  def set_chat_room
    @chat_room = ChatRoom.find(params[:chat_room_id])
  end

  def comment_params
    params.require(:comment).permit(*policy(Comment).permitted_attributes)
  end
end
