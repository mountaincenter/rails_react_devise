# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Api::V1::Auth", type: :request do
  describe "POST /api/v1/auth#create" do
    let(:user) do
      attributes_for(:user, email: "signup@example.com", name: "signupテスト")
    end
    it "正常レスポンスコードが返ってくる" do
      post api_v1_user_registration_url, params: user
      expect(response.status).to eq 200
    end
    it "1件増えて返ってくる" do
      expect do
        post api_v1_user_registration_url, params: user
      end.to change { User.count }.by(1)
    end
    it "nameが正しく返ってくる" do
      post api_v1_user_registration_url, params: user
      json = JSON.parse(response.body)
      expect(json["data"]["name"]).to eq("signupテスト")
    end
    it "不正パラメータの時にerrorsが返ってくる" do
      post api_v1_user_registration_url, params: {}
      json = JSON.parse(response.body)
      expect(json.key?("errors")).to be true
    end
  end
  describe "POST /api/v1/auth/sign_in#create" do
    let(:user) do
      create(:user, email: "signin@example.com", name: "signinテスト")
      { email: "signin@example.com", password: "password" }
    end
    it "正常レスポンスコードが返ってくる" do
      post api_v1_user_session_url, params: user, as: :json
      expect(response.status).to eq 200
    end
    it "nameが正しく返ってくる" do
      post api_v1_user_session_url, params: user
      json = JSON.parse(response.body)
      expect(json["data"]["name"]).to eq("signinテスト")
    end
    it "不正パラメータの時にerrorsが返ってくる" do
      post api_v1_user_session_url, params: {}
      json = JSON.parse(response.body)
      expect(json.key?("errors")).to be true
    end
  end
end
