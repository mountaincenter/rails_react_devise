# frozen_string_literal: true

require "rails_helper"

RSpec.describe User, type: :model do
  describe "name" do
    context "blankの時に" do
      let(:user) do
        build(:user, name: "")
      end
      it "invalidになる" do
        expect(user).not_to be_valid
      end
    end
    context "maxlengthにより" do
      context "30文字の場合に" do
        let(:user) do
          build(:user, name: "あ" * 30)
        end
        it "validになる" do
          expect(user).to be_valid
        end
      end
      context "31文字の場合に" do
        let(:user) do
          build(:user, name: "あ" * 31)
        end
        it "invalidになる" do
          expect(user).not_to be_valid
        end
      end
    end
  end
  describe "email" do
    context "blankの時に" do
      let(:user) do
        build(:user, email: "")
      end
      it "invalidになる" do
        expect(user).not_to be_valid
      end
    end
    context "maxlengthにより" do
      context "100文字の場合に" do
        let(:user) do
          build(:user, email: "@example.com".rjust(100, "a"))
        end
        it "validになる" do
          expect(user).to be_valid
        end
      end
      context "101文字の場合に" do
        let(:user) do
          build(:user, email: "@example.com".rjust(101, "a"))
        end
        it "invalidになる" do
          expect(user).not_to be_valid
        end
      end
    end
    context "email形式により" do
      context "正しい文字列の場合に" do
        let(:user) do
          build(:user, email: "test@example.com")
        end
        it "validになる" do
          expect(user).to be_valid
        end
      end
      context "正しくない文字列の場合に" do
        let(:user) do
          build(:user, email: "test@example")
        end
        it "invalidになる" do
          expect(user).not_to be_valid
        end
      end
    end
  end
end
