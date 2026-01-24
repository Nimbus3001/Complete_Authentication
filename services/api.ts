// API Base path alignment with app.js backend
const API_BASE_URL = 'http://localhost:5000/api/auth/admin';
const STORAGE_KEY = 'codemania_mock_users';
const TOKEN_KEY = 'codemania_auth_token';

const getMockUsers = () => {
  const usersJson = localStorage.getItem(STORAGE_KEY);
  if (!usersJson) return [];
  try {
    return JSON.parse(usersJson);
  } catch (e) {
    return [];
  }
};

const saveMockUser = (user) => {
  const usersList = getMockUsers();
  usersList.push(user);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usersList));
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok && data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
      return { 
        success: true, 
        message: 'Login successful', 
        status: response.status,
        token: data.token
      };
    }
    
    return { 
      success: false, 
      message: data.message || 'Invalid username or password', 
      status: response.status 
    };
  } catch (error) {
    const users = getMockUsers();
    const foundUser = users.find(u => u.username === username && u.password === password);
    
    await new Promise(resolve => setTimeout(resolve, 600));

    if (foundUser) {
      const mockToken = `sim_jwt_${Math.random().toString(36).substr(2, 12)}`;
      localStorage.setItem(TOKEN_KEY, mockToken);
      return { 
        success: true, 
        message: 'Offline Mode: Login Successful', 
        status: 200,
        token: mockToken
      };
    }
    
    return { 
      success: false, 
      message: 'Offline Mode: User not found', 
      status: 401 
    };
  }
};

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: 'Registration successful', status: response.status };
    }
    
    return { success: false, message: data.message || 'Registration failed', status: response.status };
  } catch (error) {
    const users = getMockUsers();
    if (users.some(u => u.username === username)) {
      return { success: false, message: 'Offline Mode: Username taken', status: 400 };
    }

    saveMockUser({ username, password });
    return { 
      success: true, 
      message: 'Offline Mode: Account saved', 
      status: 201 
    };
  }
};

export const resetPassword = async (username) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    success: true,
    message: 'Reset link sent',
    status: 200
  };
};