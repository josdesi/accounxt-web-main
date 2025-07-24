import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, TextField, Button, Typography } from '@mui/material';
import { login } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { encryptWithPublicKey } from '../utils/encryption';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const encryptedPassword = await encryptWithPublicKey(formData.password);
      const encryptedFormData = {
        username: formData.username,
        password: encryptedPassword
      };

      dispatch(login(encryptedFormData)).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          navigate('/dashboard');
        }
      });
    } catch (err) {
      console.error('Encryption failed:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" textAlign="center" mb={3}>
          Login
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
          {error && <Typography color="error" mb={2}>{error}</Typography>}
          <Button type="submit" variant="contained" fullWidth size="large" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}