import { AxiosPromise } from "axios"
import client from "./client"
import { PostApiJson } from "interfaces"

export const getPosts = (): AxiosPromise<PostApiJson> => {
  return client.get("/posts")
}

export const createPost = (data: FormData): AxiosPromise => {
  return client.post("/posts", data)
}

export const deletePost = (id: string): AxiosPromise => {
  return client.delete(`/posts/${id}`)
}