import { createContext } from "react";

export const ARContext = createContext({ ready: false });
export const NavigationContext = createContext(null);
export const CharAtContext = createContext({
  charAt: null,
  setCharAt: () => {},
});
