import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getArtistList = async () => {
    try {
        const response = await apiClient.get('/artists/');
        return response.data;
    } catch (error) {
        console.error("Error obteniendo la lista de Artistas:", error);
        throw error;
    }
};

export const getArtist = async (id) => {
    try {
        const response = await apiClient.get(`/artists/${id}/`);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo artista:", error);
        throw error;
    }
};

export const addArtist = async (artistData) => {
    try {
        const formData = new FormData();

        formData.append("name", artistData.name);
        formData.append("country", artistData.country);
        formData.append("genre", artistData.genre);

        if (artistData.picture) {
            formData.append("picture", artistData.picture);
        }
        for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
        }
        const response = await apiClient.post("/artists/", formData, {});

        return response.data;
    } catch (error) {
        console.error("Error completo:", error);
        console.error("Respuesta del servidor:", error.response?.data);
        console.error("Error de picture:", error.response?.data?.picture);
        throw error;
    }
};


export const updateArtist = async (id, artistData) => {
    try {
        const formData = new FormData();
        formData.append("name", artistData.name);
        formData.append("country", artistData.country);
        formData.append("genre", artistData.genre);
        if (artistData.picture) {
            formData.append("picture", artistData.picture);
        }
        const response = await apiClient.patch( `/artists/${id}/`, formData, { });
        return response.data;
    } catch (error) {
        console.error("Error actualizando artista:", error);
        throw error;
    }
};

export const deleteArtist = async (id) => {
    try {
        await apiClient.delete(`/artists/${id}/`);
    } catch (error) {
        console.error("Error eliminando artista:", error);
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

        if (albumData.cover) {
            formData.append("cover", albumData.cover);
        }
        const response = await apiClient.post( "/albums/", formData, { });

        return response.data;
    } catch (error) {
        console.error("Error agregando álbum:", error);
        throw error;
    }
};