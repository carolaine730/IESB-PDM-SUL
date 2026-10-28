async function request(path, options = {}) {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL;

  if (!baseUrl) {
    throw new Error('Configure EXPO_PUBLIC_API_URL no arquivo .env.');
  }

  const url = `${baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Erro na API: HTTP ${response.status}.`);
  }

  return response.json();
}

export const api = {
  get(path) {
    return request(path);
  },

  create(path, data) {
    return request(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
};