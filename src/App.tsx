import React from 'react'
import WrapperComponent from './components/WrapperComponent'
import AuthNavigator from "./components/navigators/AuthNavigator"
import AppNavigator from "./components/navigators/AppNavigator"
import "../src/i18n"
import { AuthState } from './redux/auth/types'
import { useSelector } from 'react-redux'
import { authSelector } from './redux/auth/authSlice'
const App = () => {
  const authState: AuthState = useSelector(authSelector)
  
  return (
    // <WrapperComponent isHeader={false}>
    <>
    {authState.currentUser? 
       <AppNavigator />: <AuthNavigator />
}</>
      
     
    // </WrapperComponent>
  )
}

export default App
