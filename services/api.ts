
import { AuthResponse } from '../types';

/**
 * Note: Since the provided backend is a local server running on port 3000,
 * we attempt to fetch from localhost:3000. 
 * 
 * FIX: Added a fallback to localStorage simulation if the server is unreachable.
 * This prevents the "Failed to fetch" error from breaking the user experience.
 */
const API_BASE_URL = 'http://localhost:3000';

// Simple local storage keys for the simulation
const STORAGE_KEY = 'codemania_mock_users';

interface MockUser {
  name: string;
  password: string; // In a real app, never store plain text passwords
}

const getMockUsers = (): MockUser[] => {
  const users = localStorage.getItem(STORAGE_KEY);
  return users ? JSON.parse(users) : [];
};

const saveMockUser = (user: MockUser) => {
  const users = getMockUsers();
  users.push(user);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const loginUser = async (name: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password }),
    });

    const text = await response.text();

    if (response.ok) {
      if (text === 'Success') {
        return { success: true, message: 'ACCESS GRANTED: WELCOME ' + name.toUpperCase(), status: response.status };
      } else if (text === 'Not Allowed') {
        return { success: false, message: 'Invalid credentials', status: response.status };
      }
    }
    
    return { success: false, message: text || 'Login failed', status: response.status };
  } catch (error) {
    console.warn('Backend unreachable, switching to simulation mode:', error);
    
    // Fallback Simulation Logic
    const users = getMockUsers();
    const user = users.find(u => u.name === name && u.password === password);
    
    if (user) {
      return { 
        success: true, 
        message: '[SIMULATION] ACCESS GRANTED: WELCOME ' + name.toUpperCase(), 
        status: 200 
      };
    }
    
    return { 
      success: false, 
      message: 'SIMULATION: Identity not found or incorrect key', 
      status: 401 
    };
  }
};

export const registerUser = async (name: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password }),
    });

    if (response.status === 201) {
      return { success: true, message: 'ID CREATED SUCCESSFULLY. PLEASE LOGIN.', status: response.status };
    }
    
    const text = await response.text();
    return { success: false, message: text || 'Failed to create user', status: response.status };
  } catch (error) {
    console.warn('Backend unreachable, switching to simulation mode:', error);

    // Fallback Simulation Logic
    const users = getMockUsers();
    if (users.some(u => u.name === name)) {
      return { success: false, message: 'SIMULATION: ID already exists', status: 400 };
    }

    saveMockUser({ name, password });
    return { 
      success: true, 
      message: '[SIMULATION] IDENTITY REGISTERED IN LOCAL STORAGE', 
      status: 201 
    };
  }
};

/**
 * Simulated password reset. 
 * Since the original backend doesn't have this, we simulate it.
 */
export const resetPassword = async (name: string): Promise<AuthResponse> => {
  // Artificial delay for realism
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulation: Always succeed if name is provided
  return {
    success: true,
    message: '[SIMULATION] RECOVERY PACKET SENT TO ' + name.toUpperCase(),
    status: 200
  };
};
