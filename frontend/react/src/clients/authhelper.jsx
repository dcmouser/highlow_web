// see https://www.telerik.com/blogs/react-basics-how-when-use-react-context

// react
import { React, useContext, createContext, useMemo, useState } from "react";

import {isLoggedIn} from "./clientHelper"




export const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn());

  const updateIsUserLoggedIn = (val) => {
    // Authenticate user and set user information and authentication status
    setIsUserLoggedIn(val);
  };

  
  const memoedValue = useMemo(
    () => ({
        isUserLoggedIn, updateIsUserLoggedIn
    }),
    [isUserLoggedIn]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      { children }
    </AuthContext.Provider>
  );
};




export function useAuth() {
    return useContext(AuthContext);
}
