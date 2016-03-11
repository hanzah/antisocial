class Comment < ApplicationRecord
  # text
  belongs_to :commentable, polymorphic: true
  validates :text, presence: true
  
  scope :ordered, -> { order('created_at DESC') }
  
  after_create :send_notifications

  def beacon
    commentable.beacon
  end

  private

  def send_notifications
    return unless commentable_type == 'ChatRoom'
    ActionCable.server.broadcast "chat_room_channel_#{commentable_id}", comment: self
  end
end
