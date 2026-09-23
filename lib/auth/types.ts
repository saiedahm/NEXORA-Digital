 export type AuthUser = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
};

export type AuthSession = {
  user: AuthUser;
  expires: string;
};
