import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [loginData, setLoginData] = useState(null);
    const login = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:3001/user/login", { email, password });
            if (response.data.token) {

                setLoginData(response.data.userdetails);
            }
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
        }
    };
    const logout = () => {

        setLoginData(null);
    };

    return (
        <UserContext.Provider value={{ loginData, setLoginData, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);