# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    subject { "MyString" }
    body { "MyText" }
    image { Rack::Test::UploadedFile.new(File.join(Rails.root, "spec/fixtures/test.jpg")) }
    after(:build) do |obj|
      obj.user = build(:user) if obj.user.nil?
    end
  end
end
