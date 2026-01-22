export const API_ROOT = "http://localhost:8080";

export async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // 🔹 Rotas públicas (/auth) NÃO usam /api
  const url = endpoint.startsWith("/auth")
    ? `${API_ROOT}${endpoint}`
    : `${API_ROOT}/api${endpoint}`;

  // 🔹 Headers padrão
  const headers = new Headers(options.headers || {});

  // 🔹 Só define JSON se NÃO for FormData
  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  // 🔹 Injeta token JWT corretamente (PADRÃO ÚNICO)
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
        `Erro HTTP ${response.status}`;
      throw new Error(errorMessage);
    }

    return data as T;
  } catch (error: any) {
    console.error(`Erro na requisição para ${endpoint}:`, error.message);
    throw error;
  }
}