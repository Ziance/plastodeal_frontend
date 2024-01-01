import React, { useEffect, useState } from 'react'
import AuthNavigator from "./components/navigators/AuthNavigator"
import AppNavigator from "./components/navigators/AppNavigator"
import { AuthState } from './redux/auth/types'
import { useSelector } from 'react-redux'
import { authSelector } from './redux/auth/authSlice'
import "../src/i18n"

const App = () => {
  const authState: AuthState = useSelector(authSelector)
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    setIsLogin(authState && authState.currentUser ? true : false)
  }, [authState])

  return (
    isLogin ? <AppNavigator /> : <AuthNavigator />
  )
}

export default App
