import { createContext } from "react";

export const ARContext = createContext({ ready: null });
export const NavigationContext = createContext(null);
export const TextContext = createContext({
  firstTextWidth: null,
  setFirstTextWidth: null,
});
