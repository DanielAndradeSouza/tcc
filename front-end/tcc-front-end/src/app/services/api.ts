// app/services/api.ts
export async function fetchData(endpoint: string, options: RequestInit = {}) {
  const API_URL = 'http://localhost:3050';
  const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;

  const res = await fetch(url, options);
  const raw = await res.text();

  let json;
  try {
    json = JSON.parse(raw);
  } catch {
    json = raw;
  }

  if (!res.ok) {
    // Lança erro com status e corpo da resposta do backend
    throw {
      status: res.status,
      message: json?.message || 'Erro na requisição',
      body: json,
    };
  }

  return json;
}
