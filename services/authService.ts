import { request } from "./apiClient";
import { User, LoginRequest, RegisterRequest } from "@/types";

interface LoginResponse {
  token: string;
  userId: number;
  username: string;
}

export const authService = {
  login: async (data: LoginRequest) => {
    const response = await request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (typeof window !== "undefined") {
      localStorage.setItem("ifconnected:token", response.token);
      localStorage.setItem("ifconnected:userId", response.userId.toString());
    }

    // 🔹 BUSCA O USUÁRIO COMPLETO
    const user = await request<User>(`/users/${response.userId}`);

    localStorage.setItem("ifconnected:user", JSON.stringify(user));

    return user;
  },

  register: (data: RegisterRequest) =>
    request<void>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getMe: (id: number) => request<User>(`/users/${id}`),
};
