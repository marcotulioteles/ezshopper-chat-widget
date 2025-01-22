import { useState } from "react";

/**
 * A React hook for interacting with local storage.
 * @param key The key to store the data under in local storage.
 * @param initialValue The initial value to use if no data exists in local storage.
 * @returns An array with the current value and a setter function.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      // Parse the stored JSON or return the initial value
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading local storage:", error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function to mimic useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      // Save to local storage
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting local storage:", error);
    }
  };

  return [storedValue, setValue] as const;
}
