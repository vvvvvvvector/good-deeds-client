export const getMyEmailAndUsername = async (token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const deleteMyProfile = async (token: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateMyProfile = (
  dto: {
    email: string;
    username: string;
    password: string;
  },
  token: string
) => {};
