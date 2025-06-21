import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './store/slices/authSlice';

import Login from './components/Login';
import Dashboard from './components/Dashboard';

const theme = createTheme({
  palette: {
    mode: 'light'
  }
});

export default function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              token
                ? <Navigate to="/dashboard" />
                : <Login />
            }
          />
          <Route
            path="/dashboard"
            element={
              token
                ? <Dashboard onLogout={handleLogout} />
                : <Navigate to="/" />
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
