import { createContext } from "react";

export const PageContext = createContext({
  pages: [],

  savePage: () => {},
  deletePage: () => {},
  updatePage: () => {}
});