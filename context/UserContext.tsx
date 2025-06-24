import { createContext } from "react";

export const UserContext = createContext({
  user: null as any,
  setUser: (user: any) => {},
});
