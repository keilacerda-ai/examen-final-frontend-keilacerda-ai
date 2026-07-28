import { useEffect, useState } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
import AlbumCard from "../components/AlbumCard";
import "./AlbumList.css";
import { getAlbumList } from "../services/albumService";

export default function AlbumList() {

    const [albums, setAlbums] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            async function loadAlbums() {
                try {
                    const data = await getAlbumList();
                    setAlbums(data);
                } catch (error) {
                    setErrorMsg("Error obteniendo la lista de Álbums.");
                    console.error("Error obteniendo álbums:", error);
                } finally {
                    setLoading(false);
                }
            }
            loadAlbums();
        }, []);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                💿 Lista de Álbumes
            </Typography>
            {albums.map((album) => (
                <Box key={album.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <AlbumCard album={album} />
                </Box>
                ))}
                { errorMsg !== "" && (
                    <Box>
                        <Typography color="error">
                            {errorMsg}
                        </Typography>
                    </Box>
                )}
        </>
    );
}