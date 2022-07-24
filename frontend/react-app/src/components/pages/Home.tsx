import React, { useContext } from "react"
import { AuthContext } from "App"
import PostList from "components/post/PostList"
import { Link } from "react-router-dom"

const LinkStyle = {
  textDecoration: "none",
}

const Home: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext)
  return(
    <>
      {
        isSignedIn && currentUser ? (
          <>
            <h1>Signed in successfully!</h1>
            <Link to="/users" style={{ ...LinkStyle }}>
              <h2>Email: {currentUser?.email}</h2>
            </Link>
            <h2>Name: {currentUser?.name}</h2>
            <PostList />
          </>
        ) : (
          <>
            <h1>Not signed in</h1>
            <PostList />
          </>
        )
      }
    </>
  )
}

export default Home