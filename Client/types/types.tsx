export type UserType = {
    name: string | null;
    email: string | null;
    id: number | null;
    
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