import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { signOut } from "lib/api/auth"
import { AuthContext } from "App"
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'

const Header: React.FC = () => {
  const { loading, isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleSignOut = async(e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut()
      if (res.data.success === true) {
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")
        setIsSignedIn(false)
        navigate("/signin")
        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
    } catch (err) {
      console.log(err)
    }
  }
  const AuthButtons = () => {
    if (!loading) {
      if (isSignedIn) {
        return (
          <>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, textDecoration: "none", color: "inherit"}}
            >
              <small>logged_in_user:</small>{ currentUser?.name }さん
            </Typography>
            <Button
              color="inherit"
              sx={{ textTransform: "none"}}
              onClick={handleSignOut}
            >
              Sign out
            </Button>
          </>
        )
      } else {
          return(
            <>
              <Button
                component={Link}
                to="/signin"
                color="inherit"
                sx={{ textTransform: "none" }}
              >
                Sign in
              </Button>
              <Button
                component={Link}
                to="/signup"
                color="inherit"
                sx={{ textTransform: "none"}}
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
  return(
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            sx={{ marginRight: 2 }}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit"}}
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