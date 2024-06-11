
import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState({});

    const value = {
        userInfo,
        setUserInfo,
      };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}



