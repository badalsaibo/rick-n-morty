const API_ENDPOINTS = {
  public: {
    get: {
      characters: '/character',
      locations: '/locations',
      episodes: '/episodes',
      character: (id: number) => `/character/${id}`,
      location: (id: number) => `/location/${id}`,
      episode: (id: number) => `/episode/${id}`,
    },
  },
};

export default API_ENDPOINTS;
