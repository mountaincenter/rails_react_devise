# frozen_string_literal: true

module Api
  #
  # registrations_controller.rb
  #
  module V1
    module Auth
      #
      # registrations_controller
      #
      class RegistrationsController < DeviseTokenAuth::RegistrationsController
        private

        def sign_up_params
          params.permit(:email, :password, :password_confirmation, :name)
        end
      end
    end
  end
end
