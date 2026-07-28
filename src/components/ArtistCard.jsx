import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteArtist } from "../services/artistService";
import "./ArtistCard.css";

export default function ArtistCard({ artist }) {
    console.log(artist);
    const navigate = useNavigate();

    const handleDelete = async () => {
    const ok = window.confirm(
        "¿Desea eliminar este artista?"
    );
    if (!ok) return;
    try {
        await deleteArtist(artist.id);
        alert("Artista eliminado.");
        window.location.reload();
    } catch {
        alert("No se pudo eliminar.");
    }
};

return (
        <Card>
            <CardMedia
                component="img"
                image={artist.picture}
                alt={artist.name}
                sx={{
                    height: 260,
                    objectFit: "cover"
                }}
            />
            <CardContent sx={{ padding: 2 }}>
                <Typography variant="h5" fontWeight="bold">
                    🎤 {artist.name}
                </Typography>
                <Typography color="text.secondary">
                   🎼 Género: {artist.genre}
                </Typography>
                <Typography color="text.secondary">
                   🌎 País: {artist.country}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent:"center", gap:2 }}>
                <Button
                size="small"
                variant="contained"
                onClick={() => navigate(`/artists/edit/${artist.id}`)}
                >
                    Editar
                </Button>
                <Button
                color="error"
                variant="contained"
                onClick={handleDelete}
                >
                    Eliminar
                </Button>
            </CardActions>
        </Card>
    );
}