export const getAllUserThings = async (token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/things`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const deleteThingById = async (id: number, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/things/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await response.json();
};

export const updateThingById = async (
  id: number,
  text: string,
  token: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/things/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text,
      }),
    }
  );

  return await response.json();
};

export const addNewThing = async (text: string, token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/things`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text,
    }),
  });

  return await response.json();
};
