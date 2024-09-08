export const getIdFromUrl = (url: string) => {
  const id = new URL(url).pathname.split('/').pop();
  if (id) {
    return Number(id);
  }

  return 0;
};

export const debounce = (func: () => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: any) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
