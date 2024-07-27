import { useState } from 'react'
import './App.css'
import Navbar from './Views/Navbar/main'
import Products from './components/Products/main'
import Productsdetail from './components/Productsdetail/main'
import Router from './Config/router'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor , store } from './components/store/main'

function App() {

  return (
    <div>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <Router />
      </PersistGate>
    </Provider>
    
    </div>


  )
}

export default App
