# frozen_string_literal: true

unless User.exists?
  10.times do |i|
    email = "test#{i + 1}@example.com"
    User.create!(email: email, password: "password",
                 uid: email, provider: "email", name: Faker::Name.name)
  end
end
