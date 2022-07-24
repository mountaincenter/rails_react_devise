# frozen_string_literal: true

#
# application_controller
#
class ApplicationController < ActionController::Base
  include Pundit
  include DeviseTokenAuth::Concerns::SetUserByToken
  rescue_from ActiveRecord::RecordNotFound, with: :render404

  skip_before_action :verify_authenticity_token
  helper_method :current_user, :user_signed_in?

  def render404
    render status: 404, json: { message: "record not found." }
  end
end
