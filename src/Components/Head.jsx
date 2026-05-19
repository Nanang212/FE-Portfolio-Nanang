import { useEffect } from 'react';

export const Head = ({ title }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
  return null;
};
