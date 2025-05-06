export async function fetchData(endpoint: string, options: RequestInit = {}) {
  const API_URL = 'http://localhost:3050';
  const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;

  try {
    const res = await fetch(url, options);
    const raw = await res.text();
    if (!res.ok) {
      throw new Error(`Erro na requisição: ${res.status} - ${raw}`);
    }

    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }

  } catch (err) {
    console.error("Erro na requisição:", err);
    throw err; // ← Isso aqui é essencial
  }
}
