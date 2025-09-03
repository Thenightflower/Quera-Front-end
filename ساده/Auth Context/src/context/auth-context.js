import React, { createContext, useState } from "react";

const API_BASE = process.env.REACT_APP_API_URL;
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);   
    const [error, setError] = useState(null); 

    const login = async (username, password) => {
        try {
            setError(null);
            const res = await fetch(`${API_BASE}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.status !== 200) {
                throw new Error(data.message || "Login failed");
            }

            setUser(data.user);
        } catch (err) {
            setError(err.message);
        }
    };

    const register = async (username, password) => {
        try {
            setError(null);

            const res = await fetch(`${API_BASE}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });


            const data = await res.json();

            if (res.status !== 200) {
                throw new Error(data.message || "Register failed");
            }

            setUser(data.user);
        } catch (err) {
            setError(err.message);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, error, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
