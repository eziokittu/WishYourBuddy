import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const usePage = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    // Load pages from localStorage when the hook initializes
    const storedPages = JSON.parse(localStorage.getItem('pagesData'));
    if (storedPages && storedPages.pages) {
      setPages(storedPages.pages);
    }
  }, []);

  const savePage = useCallback((_pages) => {
    setPages(_pages);
    localStorage.setItem(
      'pagesData',
      JSON.stringify({ pages: _pages })
    );
  }, []);

  const loadPage = useCallback(() => {
    const storedPages = JSON.parse(localStorage.getItem('pagesData'));
    return storedPages ? storedPages.pages : [];
  }, []);

  const deletePage = useCallback(() => {
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
  }, []);

  return {
    pages,
    savePage,
    loadPage,
    deletePage
  };
};
