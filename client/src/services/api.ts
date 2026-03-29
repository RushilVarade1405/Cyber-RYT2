const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const apiRequest = async (
  endpoint: string,
  method: string = 'GET',
  body?: object,
  token?: string
) => {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
};