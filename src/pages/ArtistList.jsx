import { useEffect, useState } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
import ArtistCard from "../components/ArtistCard";
import "./ArtistList.css";
import { getArtistList } from "../services/artistService";

export default function ArtistList() {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        async function loadArtists() {
            try {
                const data = await getArtistList();
                setArtists(data);
            } catch (error) {
                setErrorMsg("Error obteniendo la lista de Artistas.");
                console.error("Error obteniendo artistas:", error);
            } finally {
                setLoading(false);
            }
        }

        loadArtists();
    }, []);

    if (loading) {
        return (
            <Box
    sx={{
        display: "flex",
        justifyContent: "center",
    }}
>
                <CircularProgress />
            </Box>
        );
    }

   return (
        <>
            <Typography variant="h4" align="center" gutterBottom>
            🎤 Catálogo de Artistas
            </Typography>
            {artists.map((artist) => (
                <Box key={artist.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <ArtistCard artist={artist} />
                </Box>
                 ))}
                 { errorMsg !== "" && (
                    <Box item xs={12}>
                        <Typography color="error">
                            {errorMsg}
                        </Typography>
                    </Box>
                )}
        </>
    );
}

