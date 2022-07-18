export const getToken = (data) => {
  return {
    type: "token",
    payload: data,
  };
};
