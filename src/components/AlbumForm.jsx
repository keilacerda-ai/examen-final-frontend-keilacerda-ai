import {
    Box,
    Button,
    TextField,
    Typography,
    MenuItem,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { addAlbum, updateAlbum, getAlbum } from "../services/albumService";
import { getArtistList } from "../services/artistService";
import './AlbumForm.css';

export default function AlbumForm() {
    const navigate = useNavigate();
    const [artists, setArtists] = useState([]);
    const [errorMsg] = useState("");
    const { id } = useParams();
    const [albumData, setAlbumData] = useState({
        artist: "",
        title: "",
        release_year: "",
        description: "",
        cover: null,
    });

    useEffect(() => {
        async function loadArtists() {
            try {
                const data = await getArtistList();
                setArtists(data);
            } catch (error) {
                console.error("Error obteniendo artistas:", error);
            } 
        }
        loadArtists();
    }, []);


    useEffect(() => {
    async function loadAlbum() {
        try {
            const album = await getAlbum(id);

            setAlbumData({
                artist: album.artist,
                title: album.title,
                release_year: album.release_year,
                description: album.description,
                cover: null,
            });
        } catch (error) {
            console.error("Error cargando álbum:", error);
        }
    }

    if (id) {
        loadAlbum();
    }
}, [id]);


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "cover") {
            setAlbumData({ ...albumData, cover: files[0] });
        } else {
            setAlbumData({ ...albumData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await updateAlbum(id, albumData);
            alert("Álbum actualizado correctamente.");
        } else {
            await addAlbum(albumData);
            alert("Álbum agregado correctamente.");
        }
        navigate("/albums");
    };

    return (
        <>
            <Typography variant="h4" align="center" gutterBottom>
                {id ? "✏️ Editar Álbum" : "💿 Nuevo Álbum"}
            </Typography>
            <Box
                component="form"
                className="album-form"
                onSubmit={handleSubmit}
            >
                <TextField
                    select
                    label="Artista"
                    name="artist"
                    value={albumData.artist}
                    onChange={handleChange}
                    required
                    fullWidth
                >

                    {artists.map((artist) => (
                        <MenuItem
                            key={artist.id}
                            value={artist.id}
                        >
                            {artist.name}
                        </MenuItem>

                    ))}

                </TextField>
                <TextField
                    label="Título"
                    name="title"
                    value={albumData.title}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label="Año"
                    name="release_year"
                    type="number"
                    value={albumData.release_year}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label="Descripción"
                    name="description"
                    multiline
                    rows={4}
                    value={albumData.description}
                    onChange={handleChange}
                    fullWidth
                />
                {errorMsg && (
                    <Typography color="error">
                        {errorMsg}
                    </Typography>
                )}
                <Button
                    variant="contained" 
                    color="primary" 
                    type="submit"
                    >
                    {id ? "Actualizar Álbum" : "Guardar Álbum"}
                </Button>
            </Box>
        </>
    );
}