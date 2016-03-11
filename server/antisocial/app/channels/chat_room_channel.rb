# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class ChatRoomChannel < ApplicationCable::Channel
  def subscribed
    @beacon = Beacon.find_by_auth_token params[:auth_token]
    reject unless @beacon
    stream_from "chat_room_channel_#{@beacon.chat_room.id}"
  end

  def unsubscribed
  end

  def comment(data)
    @beacon.chat_room.comments.create(text: data['text'])
  end
end
