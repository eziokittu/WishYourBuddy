import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

export const PageContext = createContext({
  pages: [],
  savePage: () => {},
  loadPage: () => {},
  deletePage: () => {},
});

export const PageProvider = ({ children }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    // Load pages from localStorage when the component mounts
    const storedPages = JSON.parse(localStorage.getItem('pagesData'));
    if (storedPages && storedPages.pages) {
      setPages(storedPages.pages);
    }
  }, []);

  const savePage = (pageData) => {
    setPages((prevPages) => {
      const updatedPages = [...prevPages, pageData];
      localStorage.setItem('pagesData', JSON.stringify({ pages: updatedPages }));
      return updatedPages;
    });
  };

  const loadPage = () => {
    const storedPages = JSON.parse(localStorage.getItem('pagesData'));
    return storedPages ? storedPages.pages : [];
  };

  const deletePage = () => {
    const initialPage = [
      {
        type: 'background',
        id: uuidv4(),
        colour: "white",
        content: ""
      }
    ];
    setPages(initialPage);
    localStorage.setItem('pagesData', JSON.stringify({ pages: initialPage }));
  };

  return (
    <PageContext.Provider value={{ pages, savePage, loadPage, deletePage }}>
      {children}
    </PageContext.Provider>
  );
};
