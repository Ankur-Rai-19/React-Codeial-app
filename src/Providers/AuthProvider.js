import { createContext } from "react";
import { useProvideAuth } from "../Hooks";

const initialState = {
    user: null,
    login: () => {},
    logout: () => {},
    loading: true,
    signup: () => {},
    updateUser: () => {},
    updateUserFriends: () => {},
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
