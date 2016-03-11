class CreateChatRooms < ActiveRecord::Migration[5.0]
  def change
    create_table :chat_rooms do |t|
      t.integer :beacon_id
      t.timestamps
    end
  end
end
