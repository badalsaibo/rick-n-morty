const API_ENDPOINTS = {
  public: {
    get: {
      characters: '/character',
      locations: '/locations',
      episodes: '/episodes',
      character: (id: string) => `/character/${id}`,
      location: (id: string) => `/location/${id}`,
      episode: (id: string) => `/episode/${id}`,
    },
  },
};

export default API_ENDPOINTS;
