export const API_CONFIG = {
  baseURL: 'http://localhost:3333/api',
  endpoints: {
    transactions: '/transactions',
  },
};

export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.baseURL}${endpoint}`;
};
