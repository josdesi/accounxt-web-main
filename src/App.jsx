
import { useState } from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

const theme = createTheme({
  palette: {
    mode: 'light'
  }
})

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true)
    } else {
      alert('Invalid credentials')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </ThemeProvider>
  )
}
