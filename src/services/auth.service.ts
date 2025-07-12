import authApiClient from "../lib/authAxios";
import type {
  LoginCredentials,
  LoginResponse,
  ChangeCredential,
} from "../types/auth";
export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await authApiClient.post<LoginResponse>(
      "/login",
      credentials
    );
    const token = response.data.data.token;

    if (token) {
      localStorage.setItem("token", token);
    }
    return response.data;
  },

  changeCredential: async (payload: ChangeCredential) => {
    const token = authService.getToken();

    if (!token) {
      throw new Error("No token found");
    }
    const response = await authApiClient.put("/change-credential", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  logout(): void {
    localStorage.clear();
  },
};
