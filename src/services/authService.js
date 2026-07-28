import axios from "axios";

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

const authClient = axios.create({
    baseURL: AUTH_BASE_URL,
});

export const login = async (username, password) => {
    try {
        const params = new URLSearchParams();
        params.append("grant_type", "password");
        params.append("username", username);
        params.append("password", password);
        params.append("client_id", CLIENT_ID);
        params.append("client_secret", CLIENT_SECRET);

        const response = await authClient.post("/token/", params,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        localStorage.setItem(
            "token",
            response.data.access_token
        );
        return response.data;
    } catch (error) {
        console.error(error.response?.data);
        throw new Error("Error en login: " + error.message, { cause: error });
    }
};

export const isLoggedIn = () => {
    return !!localStorage.getItem("token");
};

export const logout = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        await authClient.post('/revoke_token/', {
            token: token,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        });
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
    localStorage.removeItem("token");
}

export const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
});