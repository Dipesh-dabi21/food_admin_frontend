import { useCallback, useState } from "react";
import { api, getApiData } from "../services/api";

export function useAuth() {
    const [token, setToken] = useState(
        () => localStorage.getItem("adminToken") || ""
    );
    const [authError, setAuthError] = useState("");
    const [authLoading, setAuthLoading] = useState(false);

    const login = useCallback(async (credentials) => {
        setAuthLoading(true);
        setAuthError("");

        try {
            const response = await api.post(
                "/auth/login",
                credentials
            );

            const data = getApiData(response);
            const accessToken = data?.token;

            if (!accessToken) {
                throw new Error("The server did not return an access token.");
            }

            localStorage.setItem("adminToken", accessToken);
            setToken(accessToken);

            return true;
        } catch (error) {
            setAuthError(
                error.response?.data?.message ||
                error.message ||
                "Login failed. Check your credentials."
            );

            return false;
        } finally {
            setAuthLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("adminToken");
        setToken("");
        setAuthError("");
    }, []);

    return {
        token,
        isAuthenticated: Boolean(token),
        authError,
        authLoading,
        login,
        logout,
    };
}
