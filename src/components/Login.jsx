import { useState } from 'react';
import { 
  Box,
  Paper,
  TextField,
  Button,
  Typography
} from '@mui/material';
const apiUrl = import.meta.env.VITE_API_URL;


export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8090/login', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.status === 200) {
        window.location.href = '/dashboard';
      } else {
        console.error('Login failed:', await response.json());
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400
        }}
      >
        <Typography variant="h5" component="h1" textAlign="center" mb={3}>
        Login {apiUrl}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            name="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
