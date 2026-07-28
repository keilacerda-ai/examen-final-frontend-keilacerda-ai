import {
    Box,
    Button,
    TextField,
    Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addArtist, getArtist, updateArtist } from "../services/artistService";
import './ArtistForm.css';

export default function ArtistForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log("ID recibido:", id);

    const [errorMsg, setErrorMsg] = useState("");
    const [artistData, setArtistData] = useState({
        name: "",
        country: "",
        genre: "",
        picture: null,
    });

    useEffect(() => {
        const loadArtist = async () => {
            try {
                const artist = await getArtist(id);

                setArtistData({
                    name: artist.name,
                    country: artist.country,
                    genre: artist.genre,
                    picture: null,
                });

            } catch (error) {
                console.error("Error cargando artista:", error);
            }
        };

        if (id) {
            loadArtist();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "picture") {
            setArtistData({ ...artistData, picture: files[0],
            });

        } else {
            setArtistData({ ...artistData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateArtist(id, artistData);
            } else {
                await addArtist(artistData);
            }

            navigate("/");
        } catch (error) {
            console.error(error);
            setErrorMsg("No fue posible guardar el artista.");
        }
    };


    return (
        <>
            <Typography variant="h4" align="center" gutterBottom>
            {id ? "✏️ Editar Artista" : "🎤 Nuevo Artista"}
            </Typography>

            <Box
                component="form"
                className="artist-form"
                onSubmit={handleSubmit}
            >
                <TextField
                name="name"
                label="Nombre"
                value={artistData.name}
                onChange={handleChange}
                fullWidth
                required
                />
                <TextField
                name="country"
                label="País"
                value={artistData.country}
                onChange={handleChange}
                fullWidth
                required
                />
                <TextField
                name="genre"
                label="Género"
                value={artistData.genre}
                onChange={handleChange}
                fullWidth
                required
                />
                <input
                type="file"
                accept="image/*"
                name="cover"
                onChange={handleChange}
                />
                {errorMsg && (
                    <Typography color="error">
                        {errorMsg}
                    </Typography>
                )}

                <Button variant="contained" type="submit">
                {id ? "Actualizar Artista" : "Guardar Artista"}
                </Button>
            </Box>
        </>
    );
}