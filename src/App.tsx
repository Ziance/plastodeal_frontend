import React from 'react'
import WrapperComponent from './components/WrapperComponent'
import AuthNavigator from "./components/navigators/AuthNavigator"

import "../src/i18n"
const App = () => {
  return (
    // <WrapperComponent isHeader={false}>
      // <AppNavigator />
      <AuthNavigator />
    // </WrapperComponent>
  )
}

export default App
