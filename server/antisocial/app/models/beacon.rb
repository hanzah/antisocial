class Beacon < ApplicationRecord
  #uuid, name, auth_token
  validates :uuid, :name, presence: true

  has_one :chat_room, dependent: :destroy

  before_create :init

  private

  def init
    build_chat_room
    self.auth_token = SecureRandom.urlsafe_base64
  end
end
