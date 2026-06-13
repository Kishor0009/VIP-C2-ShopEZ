export const getAuthConfig = () => {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  return {
    headers: {
      Authorization: userInfo ? `Bearer ${userInfo.token}` : "",
    },
  };
};