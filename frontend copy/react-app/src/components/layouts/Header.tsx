import React, { useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"

import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material"
import { spacing } from "@mui/system"
import MenuIcon from '@mui/icons-material/Menu';

import { signOut } from "lib/api/auth"

import { AuthContent } from "App"
import { isBuffer } from "util"

const Header: React.FC = () => {
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContent)
  const navigate = useNavigate()

  const handleSignOut = async(e:React.MouseEvent<HTMLButtonElement>) =>{
    try {
      const res = await signOut()
      if(res.data.success === true) {
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")
        setIsSignedIn(false)
        navigate("/signin", { replace: true})
        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
    } catch(err) {
      console.log(err)
    }
  }

  const AuthButtons = () => {
    if(!loading) {
      if(isSignedIn) {
        return(
          <Button
            color="inherit"
            onClick={handleSignOut}
            sx={{ textTransform: "none" }}
          >
            Sign out
          </Button>
        )
      } else {
        return(
          <>
            <Button
              color="inherit"
              component={Link}
              to="/signin"
              sx={{ textTransform: "none" }}
            >
              Sign in
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/singup"
              sx={{ textTransform: "none" }}
            >
              Sign Up
            </Button>
          </>
        )
      }
    } else {
      return <></>
    }
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            sx={{ marginTop: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx= {{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
          >
            Sample
          </Typography>
          <AuthButtons />
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header