import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();
const API_URL = "http://localhost:3001";

export const UserProvider = ({ children }) => {
    const [loginData, setLoginData] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("authToken");
        const savedUserData = localStorage.getItem("userData");
        
        if (savedToken && savedUserData) {
            setToken(savedToken);
            setLoginData(JSON.parse(savedUserData));
            axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/user/login`, { email, password });
            
            if (response.data.token) {
                const newToken = response.data.token;
                const userData = response.data.userdetails;
                setToken(newToken);
                setLoginData(userData);
                localStorage.setItem("authToken", newToken);
                localStorage.setItem("userData", JSON.stringify(userData));
                axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
            }
        } catch (error) {
            console.error("Login Error:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || "Login failed. Please check email and password and try agaiin");
        }
    };

    const logout = () => {
        setLoginData(null);
        setToken(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        delete axios.defaults.headers.common["Authorization"];
    };

    return (
        <UserContext.Provider value={{ 
            loginData, 
            token,
            isAuthenticated: !!token,
            login, 
            logout 
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);