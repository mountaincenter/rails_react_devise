import React, { useState, useEffect, createContext } from "react"
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import CommonLayout from "./components/layouts/CommonLayout"
import { User } from "./interfaces/index"
import SignIn from "./components/pages/SignIn"
import SignUp from "./components/pages/SignUp"
import Home from "./components/pages/Home"
import Users from "./components/user/users"
import { getCurrentUser } from "lib/api/auth"

export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()

      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)

        console.log(res?.data.data)
      } else {
        console.log("No current user")
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])

  const Private = ({ children }: { children: React.ReactElement}) => {
    if(!loading) {
      if(isSignedIn) {
        return children
      } else {
        return <Navigate to="/signin" replace />
      }
    } else {
      return <></>
    }
  }

  return (
    <>
      <BrowserRouter>
        <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser}}>
          <CommonLayout>
            <Routes>
              {/* <Route path="/" element={<Private children={<Home />} />}/> */}
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </CommonLayout>
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App