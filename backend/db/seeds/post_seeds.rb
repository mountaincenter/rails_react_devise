# frozen_string_literal: true

unless Post.exists?
  users = User.all
  users.each do |user|
    Random.rand(0..3).times do
      user.posts.create!(
        subject: Faker::Lorem.word,
        body: Faker::Lorem.paragraph,
        image: File.open("./public/images/empty.jpeg")
      )
    end
  end
end
