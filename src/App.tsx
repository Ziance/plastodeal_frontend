import React from 'react'
import WrapperComponent from './components/WrapperComponent'
import AppNavigator from "./components/navigators/AppNavigator"
import "../src/i18n"
const App = () => {
  return (
    // <WrapperComponent isHeader={false}>
      <AppNavigator />
    // </WrapperComponent>
  )
}

export default App
