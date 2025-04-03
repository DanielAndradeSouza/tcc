export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetchData(endpoint: string) {
  const res = await fetch(`${API_URL}${endpoint}`);
  return res.json();
}
