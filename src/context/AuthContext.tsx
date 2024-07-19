// The Context API in React allows for sharing values (state, functions, etc.)
// between components without having to explicitly pass props at every level of the component tree.
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "@/types";
import { getCurrentUser } from "@/lib/appwrite/api";

// Initial state for the user object with empty fields
export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

// Initial state for the authentication context, with default values and placeholder functions
const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

// Define the context type for better TypeScript support
type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

// Create the AuthContext with the initial state
const AuthContext = createContext<IContextType>(INITIAL_STATE);

// AuthProvider component to wrap around the app, providing auth context to all children
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate(); // Hook for navigation
  const [user, setUser] = useState<IUser>(INITIAL_USER); // State for storing user information
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State for storing authentication status
  const [isLoading, setIsLoading] = useState(false); // State for indicating loading status

  // Function to check if a user is authenticated
  const checkAuthUser = async () => {
    setIsLoading(true); // Start loading
    try {
      const currentAccount = await getCurrentUser(); // Fetch current user data
      if (currentAccount) {
        // If user data is retrieved, update user state and authentication status
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true); // Set authentication status to true

        return true; // Return true indicating successful authentication
      }

      return false; // Return false if no user data is found
    } catch (error) {
      console.error(error); // Log any errors
      return false;
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // useEffect to check authentication on component mount
  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback"); // Get cookie fallback from local storage
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      navigate("/sign-in"); // Navigate to sign-in page if no valid cookie is found
    }

    checkAuthUser(); // Check authentication status
  }, [navigate]); // Dependency array includes navigate to ensure proper navigation handling

  // Context value containing state and functions
  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  // Provide the auth context to all children components
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the AuthContext
export const useUserContext = () => useContext(AuthContext);
