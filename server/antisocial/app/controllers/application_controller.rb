class ApplicationController < ActionController::API
  include Pundit
  before_action :authenticate_user

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def current_beacon
    @current_beacon ||= Beacon.find_by_auth_token request.headers['auth-token']
  end

  def pundit_user
    current_beacon
  end

  private

  def authenticate_user
    unless current_beacon
      render json: { error: 'Token is invalid.' }, status: 511
    end
  end

  def user_not_authorized
    render nothing: true, status: 401
  end
end
