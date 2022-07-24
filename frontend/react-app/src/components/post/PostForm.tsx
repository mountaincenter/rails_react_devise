import React, { useCallback, useState, useContext} from "react"
import { TextField, Button, Box, IconButton } from "@mui/material"
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import CancelIcon from '@mui/icons-material/Cancel'
import { createPost } from "../../lib/api/posts"
import { AuthContext } from "App"

interface PostFormProps {
  handleGetPosts: Function
}

const borderStyles = {
  bgColor: "background.paper",
  border: 1,
  borderRadius: 1,
  borderColor: "grey.400",
  margin: "2rem 0 4rem",
  width: 320,
}

const PostForm= ({handleGetPosts}: PostFormProps) => {
  const { currentUser } = useContext(AuthContext)
  const [subject, setSubject] = useState<string>("")
  const [body, setBody] = useState<string>("")
  const [image, setImage] = useState<File>()
  const [preview, setPreview] = useState<string>("")
  const uploadImage = useCallback((e: any) => {
    const file = e.target.files[0]
    setImage(file)
  }, [])

  const previewImage = useCallback((e: any) => {
    const file =e.target.files[0]
    setPreview(window.URL.createObjectURL(file))
  }, [])

  const createFormData = (): FormData => {
    const formData = new FormData()
    formData.append("subject", subject)
    formData.append("body", body)
    if (image) formData.append("image", image)
    formData.append("user.id", "1")
    return formData
  }
  const handleCreatePost = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = createFormData()
    await createPost(data)
    .then(() => {
      setSubject("")
      setBody("")
      setImage(undefined)
      handleGetPosts()
    })
  }
  return(
    <>
      <form noValidate onSubmit={handleCreatePost} style={{ display:"flex", flexWrap: "wrap", width: 320 }}>
        <TextField
          placeholder="subject"
          variant="outlined"
          fullWidth
          rows="4"
          value={subject}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSubject(e.target.value)
          }}
        />
        <TextField
          placeholder="body"
          variant="outlined"
          multiline
          fullWidth
          rows="4"
          value={body}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBody(e.target.value)
          }}
          sx={{ marginTop: "10px" }}
        />
        <div style={{ marginTop: "10px"}}>
          <label htmlFor="icon-button-file">
            <input
              style={{ display: "none"}}
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                uploadImage(e)
                previewImage(e)
              }}
            />
            <IconButton color="inherit" component="span">
              <PhotoCameraIcon />
            </IconButton>
          </label>
        </div>
        <div style={{ marginTop: "10px", marginLeft: "10px"}}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="inherit"
            disabled={!subject || subject.length > 30 || !body || body.length > 140}
            sx={{ marginTop: "10px", marginLeft: "auto"}}
          >
            Post
          </Button>
        </div>
      </form>
      { preview ?
        <Box
          sx={{ ...borderStyles }}
        >
          <IconButton
            color="inherit"
            onClick={() => setPreview("")}
          >
            <CancelIcon />
          </IconButton>
          <img
            src={preview}
            alt="preview img"
            style={{ width: "100%" }}
          />
        </Box> : null
      }
    </>
  )
}
export default PostForm