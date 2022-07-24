# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    provider { "email" }
    sequence(:email) { |n| "test#{n}@example.com" }
    uid { email }
    password { "password" }
    remember_created_at { nil }
    name { "MyString" }
    tokens { nil }
  end
end
