import { request } from "./apiClient";
import { User, LoginRequest, RegisterRequest } from "@/types";

// Esta interface deve bater com o JSON que o seu IfConnectedController.login retorna
interface LoginResponse {
  token: string;
  user: User; // O Controller atual retorna um UserResponseDTO (que é compatível com User)
}

export const authService = {
  login: async (data: LoginRequest) => {
    // 1. Faz o login (CHAMA /api/login)
    const response = await request<LoginResponse>("/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    // 2. Salva o token se existir
    if (typeof window !== "undefined" && response.token) {
      localStorage.setItem("ifconnected:token", response.token);
      localStorage.setItem("ifconnected:userId", response.user.id.toString());
      localStorage.setItem("ifconnected:user", JSON.stringify(response.user));
    }

    // 3. Retorna o usuário que veio na resposta
    return response.user;
  },

  register: async (data: RegisterRequest) => {
    // 1. Cria o usuário (CHAMA /api/users)
    const user = await request<User>("/users", { 
      method: "POST", 
      body: JSON.stringify(data) 
    });
    
    // 2. Opcional: já loga o usuário automaticamente se o back retornar o user
    if (typeof window !== "undefined") {
        localStorage.setItem("ifconnected:user", JSON.stringify(user));
    }
    
    return user;
  },

  getMe: (id: number) => request<User>(`/users/${id}`),
};