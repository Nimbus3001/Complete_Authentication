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
        message: `UPLINK_STABLE: ACCESS_GRANTED_${username.toUpperCase()}`, 
        status: response.status,
        token: data.token
      };
    }
    
    return { 
      success: false, 
      message: data.message || 'UNAUTHORIZED_ACCESS', 
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
        message: 'SIMULATION_OVERRIDE: IDENTITY_VERIFIED', 
        status: 200,
        token: mockToken
      };
    }
    
    return { 
      success: false, 
      message: 'SIMULATION_ERROR: IDENTITY_NOT_FOUND', 
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
      return { success: true, message: 'IDENTITY_RECORDED. AWAITING_HANDSHAKE.', status: response.status };
    }
    
    return { success: false, message: data.message || 'REGISTRATION_FAILURE', status: response.status };
  } catch (error) {
    const users = getMockUsers();
    if (users.some(u => u.username === username)) {
      return { success: false, message: 'SIMULATION_ERROR: HANDLE_RESERVED', status: 400 };
    }

    saveMockUser({ username, password });
    return { 
      success: true, 
      message: 'SIMULATION: IDENTITY_STORED', 
      status: 201 
    };
  }
};

export const resetPassword = async (username) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    success: true,
    message: `RECOVERY_SIGNAL: ${username.toUpperCase()}`,
    status: 200
  };
};