import { useState } from 'react';
import { useEffect } from 'react';
export const useDebounce = (inputValue: string) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [inputValue]);

  return debouncedValue;
};
