export type SessionUserType = {
  token: string;
};

export type IThing = {
  id: number;
  text: string;
};

export type IFriendship = {
  id: number;
  addressee: {
    username: string;
    things: {
      id: number;
      text: string;
    }[];
  };
};
