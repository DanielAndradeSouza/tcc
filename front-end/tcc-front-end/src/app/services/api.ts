export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function fetchData(endpoint: string, options:RequestInit = {}) {
  const res = await fetch(`${API_URL}${endpoint}`);
  return res.json();
}
