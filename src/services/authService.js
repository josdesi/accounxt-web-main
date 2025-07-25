import { API_BASE_URL } from '../configs/AppConfig';

const AuthService = {};

AuthService.login = async ({ username, password }) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    return data.AuthenticationResult.AccessToken;
  };

export default AuthService;
