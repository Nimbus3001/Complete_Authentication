
export enum AuthMode {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER'
}

export interface AuthResponse {
  success: boolean;
  message: string;
  status: number;
}
