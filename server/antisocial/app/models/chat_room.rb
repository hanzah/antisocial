class ChatRoom < ApplicationRecord
  belongs_to :beacon
  has_many :comments, as: :commentable, dependent: :destroy
end
