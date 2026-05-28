export const API_BASE_URL = "http://localhost:8080/api";

export async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // 🔹 CORREÇÃO: Concatenação direta.
  const url = `${API_BASE_URL}${endpoint}`;

  const headers = new Headers(options.headers || {});

  // 🔹 Só define JSON se NÃO for FormData (Upload de arquivos)
  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  // 🔹 Injeta token JWT (Se existir no localStorage)
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("ifconnected:token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const text = await response.text();
    let data: any = null;

    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        console.warn("Resposta não é JSON válido:", text);
      }
    }

    if (!response.ok) {
      const errorMessage =
        data?.message ||
        data?.error ||
        `Erro na requisição: ${response.status} ${response.statusText}`;
      
      const error: any = new Error(errorMessage);
      error.response = {
        status: response.status,
        data: data
      };
      
      throw error;
    }

    return data as T;
  } catch (error: any) {
    if (!error.response) {
      console.error(`Falha em ${endpoint}:`, error.message);
    }
    throw error;
  }
}