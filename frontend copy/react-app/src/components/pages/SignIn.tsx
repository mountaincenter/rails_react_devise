import React, { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"

import { Typography, TextField, Card, CardContent, CardHeader, Button, Box } from "@mui/material"

import { AuthContext } from "App"
import AlertMessage from "components/utils/AlertMessage"

import { signIn } from "lib/api/auth"
import { SignInParams } from "interfaces"

const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [alertMessageOpen, setAleratMessageOpen] = useState<boolean>(false)

  const handleSubmit = async(e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const params: SignInParams = {
      email: email,
      password: password
    }

    try {
      const res = await signIn(params)
      console.log(res)
      if (res.status === 200){
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["cient"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)
        navigate("/")
        console.log("Signed in successfully!")
      } else {
        setAleratMessageOpen(true)
      }
    } catch(err) {
      console.log(err)
      setAleratMessageOpen(true)
    }
  }
  return(
    <>
      <form noValidate autoComplete="off">
        <Card sx={{ padding: 2, maxWidth: 400 }}>
          <CardHeader sx={{ textAlign: "center"}} title="Sign In" />
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Email"
              value={email}
              margin="dense"
              onChange={ event => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="password"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="inherit"
              disabled={!email || !password ? true : false}
              onClick={handleSubmit}
              sx={{ marginTop: 2, flexGrow: 1, textTransform: "none"}}
            />
          </CardContent>
        </Card>
      </form>
      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAleratMessageOpen}
        severity="error"
        message="Invalid email or password"
      />
    </>
  )
}

export default SignIn