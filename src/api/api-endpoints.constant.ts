const API_ENDPOINTS = {
  public: {
    get: {
      characters: '/character',
      locations: '/location',
      episodes: '/episode',
      character: (id: number) => `/character/${id}`,
      location: (id: number) => `/location/${id}`,
      episode: (id: number) => `/episode/${id}`,
    },
  },
};

export default API_ENDPOINTS;
