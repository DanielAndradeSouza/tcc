const API_URL = 'http://localhost:3050'; // ou use variável de ambiente

export async function fetchData(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint.startsWith("/") ? endpoint : "/" + endpoint}`;
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Erro na requisição: ${res.status}`);
  }
  return res.json();
}
