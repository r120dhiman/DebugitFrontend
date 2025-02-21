import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
const UserContext = createContext();
export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [loginData, setLoginData] = useState(null);
    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        if (token) {
            const tokenValue = token.split('=')[1];
            axios.get('https://debugitbackend.onrender.com/user/login', {
                headers: {
                    'Authorization': `Bearer ${tokenValue}`
                }
            }).then(response => {
                setLoginData(response.data.userdetails);
            }).catch(error => {
                console.error('Error fetching user data:', error);
            });
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('https://debugitbackend.onrender.com/user/login', { email, password });
            setLoginData(response.data.userdetails);
            document.cookie = `token=${response.data.token}; path=/; `;
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const logout = () => {
        setLoginData(null);
        document.cookie = 'token=; path=/;';
    };

    return (
        <UserContext.Provider value={{ loginData, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;