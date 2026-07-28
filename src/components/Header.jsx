import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { isLoggedIn, logout } from "../services/authService";
import hero from "../assets/hero.png";
import "./Header.css";

export default function Header() {

    const handleLogout = async () => {
        await logout();
        alert("Sesión cerrada correctamente.");
        window.location.href = "/";
    };

return (
    <header className="Music-header">
        <Container>
            <AppBar position="static">
                <Toolbar>
                    <div className="image-container">
                        <img src={hero} alt="Music" height={100} />
              <Typography variant="h4" align="center">
                Músicas Pop
              </Typography>
            </div>
                </Toolbar>
                <Toolbar>
                        <Button color="inherit" href="/">
                            Inicio
                        </Button>
                        {isLoggedIn() &&(
                            <>
                            <Button color="inherit" href="/artists/add">
                                Nuevo Artista
                            </Button>
                            <Button color="inherit" href="/albums/add">
                                Nuevo Álbum
                            </Button>
                            <Button color="inherit" onClick={handleLogout}>
                            Cerrar Sesión 
                            </Button>
                            </>
                        )}
                        {!isLoggedIn() &&(
                            <Button color="inherit" href="/login">
                            Iniciar Sesión
                            </Button>
                        )}
                    </Toolbar>
            </AppBar>
        </Container>
    </header>
)
}
     