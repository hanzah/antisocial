class BeaconsController < ApplicationController
  skip_before_action :authenticate_user, only: [:show]
  before_action :set_beacon, only: [:show]

  def show
    render json: @beacon.to_json(only: [:uuid, :name, :auth_token],
                                 include: { chat_room: { only: [:id]}})
  end

  private

  def set_beacon
    @beacon = Beacon.find_by_uuid(params[:id])
    render(nothing: true, status: 401) unless @beacon
  end
end
