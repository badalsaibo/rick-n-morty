export const getIdFromUrl = (url: string) => {
  const id = new URL(url).pathname.split('/').pop();
  if (id) {
    return Number(id);
  }

  return 0;
};
