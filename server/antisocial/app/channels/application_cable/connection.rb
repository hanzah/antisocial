# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
module ApplicationCable
  include Pundit
  class Connection < ActionCable::Connection::Base
  end
end
