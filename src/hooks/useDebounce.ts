// Hooks in React are special functions that let you use state and other React features 
// in functional components. The useDebounce hook is a custom hook that debounces a value, 
// meaning it delays updating the value until after a specified delay has passed since the last change.

import { useEffect, useState } from "react";

// Custom hook useDebounce
// This hook takes a value and a delay as arguments, and returns a debounced version of the value.
// A debounced value only updates after the specified delay has passed without the value changing.
export default function useDebounce<T>(value: T, delay: number): T {
  // State for storing the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  // useEffect hook to handle the debouncing logic
  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function that clears the timeout if the value or delay changes, or if the component unmounts
    // This prevents updating the debounced value if the value changes within the delay period.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // The effect re-runs only if the value or delay changes

  // Return the debounced value
  return debouncedValue;
}
