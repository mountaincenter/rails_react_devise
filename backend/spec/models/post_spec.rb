# frozen_string_literal: true

require "rails_helper"

RSpec.describe Post, type: :model do
  describe "subject" do
    context "blankの時に" do
      let(:post) do
        build(:post, subject: "")
      end
      it "invalidになる" do
        expect(post).not_to be_valid
      end
    end
    context "maxlengthにより" do
      context "30文字の場合に" do
        let(:post) do
          build(:post, subject: "あ" * 30)
        end
        it "validになる" do
          expect(post).to be_valid
        end
      end
      context "31文字の場合に" do
        let(:post) do
          build(:post, subject: "あ" * 31)
        end
        it "invalidになる" do
          expect(post).not_to be_valid
        end
      end
    end
  end
  describe "body" do
    context "blankの時に" do
      let(:post) do
        build(:post, body: "")
      end
      it "invalidになる" do
        expect(post).not_to be_valid
      end
    end
    context "maxlengthにより" do
      context "100文字の場合に" do
        let(:post) do
          build(:post, body: "あ" * 100)
        end
        it "validになる" do
          expect(post).to be_valid
        end
      end
      context "101文字の場合に" do
        let(:post) do
          build(:post, body: "あ" * 101)
        end
        it "invalidになる" do
          expect(post).not_to be_valid
        end
      end
    end
  end
  describe "image" do
    let(:pic_path) { Rails.root.join("spec/fixtures/test.jpg") }
    let(:pic) { Rack::Test::UploaderFile.new(pic_path) }
    context "画像が指定された時" do
      it "画像がアップロードされる" do
        image = create(:post)
        expect(image).to be_valid
      end
    end
  end
end
