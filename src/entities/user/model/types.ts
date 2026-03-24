// User (Parent) entity types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "parent" | "admin";
  subscription: "free" | "premium" | "enterprise";
  children: string[]; // child IDs
}
