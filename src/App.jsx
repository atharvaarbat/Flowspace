import { useState } from 'react'
import { Button } from "@/components/ui/button"

import { AppProvider } from './Contexts/AppContext'

import './App.css'
import Routes from './Navigation/Routes'
import { ThemeProvider } from './components/theme/theme-provider'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ToastContainer />

        <AppProvider>
          <Routes />

        </AppProvider>
      </ThemeProvider>
    </>
  )
}

export default App
