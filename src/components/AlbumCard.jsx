import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
} from "@mui/material";
import "./AlbumCard.css";
import { deleteAlbum } from "../services/albumService";
import { useNavigate } from "react-router-dom";

export default function AlbumCard({ album }) {

    const navigate = useNavigate();
    const handleDelete = async () => {
    const ok = window.confirm(
        "¿Desea eliminar este álbum?"
    );
    if (!ok) return;
    try {
        await deleteAlbum(album.id);
        alert("Álbum eliminado.");
        window.location.reload();
    } catch (error) {
        console.error(error);
        alert("No se pudo eliminar.");
    }
};

    return (
        <Card>
            <CardContent sx={{ padding: 2 }}>
                <Typography variant="h6">
                    💿 {album.title}
                </Typography>
                <Typography color="text.secondary">
                    Año: {album.release_year}
                </Typography>
                <Typography color="text.secondary">
                    {album.description}
                </Typography>
                <Typography color="text.secondary">
                    Artista ID: {album.artist}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent:"center", gap:2 }}>
                <Button
                    variant="contained"
                    onClick={() => navigate(`/albums/edit/${album.id}`)}
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