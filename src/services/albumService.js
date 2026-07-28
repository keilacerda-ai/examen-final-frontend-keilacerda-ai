import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const getAlbumList = async () => {
    try {
        const response = await apiClient.get("/albums/");
        return response.data;
    } catch (error) {
        console.error("Error obteniendo álbumes:", error);
        throw error;
    }
};

export const addAlbum = async (albumData) => {
    try {
        const formData = new FormData();
        formData.append("artist", albumData.artist);
        formData.append("title", albumData.title);
        formData.append("release_year", albumData.release_year);
        formData.append("description", albumData.description);

        const response = await apiClient.post( "/albums/", formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error agregando álbum:", error.response?.data);
        throw error;
    }
};

export const updateAlbum = async (id, albumData) => {
    try {
        const response = await apiClient.patch(`/albums/${id}/`, albumData);
        return response.data;
    } catch (error) {
        console.error("Error actualizando álbum:", error);
        throw error.response?.data || error;
    }
};

export const deleteAlbum = async (id) => {
    try {
        await apiClient.delete(`/albums/${id}/`);
    } catch (error) {
        console.error("Error eliminando álbum:", error);
        throw error;
    }
};

export const getAlbum = async (id) => {
    const response = await apiClient.get(`/albums/${id}/`);
    return response.data;
};
