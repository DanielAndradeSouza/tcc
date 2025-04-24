const API_URL = 'http://localhost:3050'; // ou use variável de ambiente
export async function fetchData(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint.startsWith("/") ? endpoint : "/" + endpoint}`;

  try {
    const res = await fetch(url, options);
    const raw = await res.text(); // Lê o corpo apenas uma vez
    console.log("Resposta bruta:", raw);

    if (!res.ok) {
      throw new Error(`Erro na requisição: ${res.status} - ${raw}`);
    }

    // Tenta fazer o parse apenas se for JSON
    try {
      return JSON.parse(raw);
    } catch (err) {
      console.warn("Resposta não é JSON válido.");
      return raw; // retorna como texto se não for JSON
    }
    
  } catch (err) {
    console.error("Erro na requisição:", err);
    return null;
  }
}
