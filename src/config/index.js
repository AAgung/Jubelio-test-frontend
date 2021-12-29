export const configUrlOptions = (options) => {
  const update = { ...options };
  if(process.env.REACT_APP_API_KEY) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    };
  }
  return update;
}