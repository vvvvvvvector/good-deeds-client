export const getMyFriendsGoodThings = async (token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/friendships`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await response.json();
};

export const addNewFriendByUsername = async (
  username: string,
  token: string
) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/friendships`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      username,
    }),
  });
};
