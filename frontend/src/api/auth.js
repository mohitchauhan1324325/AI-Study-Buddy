import api from "../utils/api";

// Register User
export const register = async (userData) => {
    try {
        const res = await api.post("/api/auth/register", userData);
        return res.data;
    } catch (error) {
        throw error;
    }
};

// Login User
export const login = async (userData) => {
    try {
        const res = await api.post("/api/auth/login", userData);

        // Save JWT Token
        localStorage.setItem("token", res.data.token);

        // Save User Details (Optional)
        localStorage.setItem("user", JSON.stringify(res.data.user));

        return res.data;
    } catch (error) {
        throw error;
    }
};

// Logout
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

// Check if User is Logged In
export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};

// Get Logged In User
export const getUser = () => {
    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
};