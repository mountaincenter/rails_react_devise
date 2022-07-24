# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :user
  mount_uploader :image, ImageUploader
  validates :subject, presence: true, length: { maximum: 30 }
  validates :body, presence: true, length: { maximum: 100 }
end
