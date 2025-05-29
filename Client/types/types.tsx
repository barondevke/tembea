export type UserType = {
  name: string | null;
  email: string | null;
  id: number | null;
  enabled: boolean | null;
  date_created: Date | null;
  profile_image: string | null;
};

export type ChildrenType = {
  children: React.ReactNode;
};

export type VerificationType = {
  name: string | null;
  email: string | null;
  id: number | null;
  date_created: Date | null;
  password: string | null;
};