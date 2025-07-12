export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  data: {
    token: string;
  };
}

export interface ChangeCredential {
  newUsername: string;
  oldPassword: string;
  newPassword: string;
}
