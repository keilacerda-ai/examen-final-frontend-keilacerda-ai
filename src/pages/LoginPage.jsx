import { Button, Box, TextField, Typography } from "@mui/material";
import { login } from "../services/authService";
import { useState } from "react";
import "./LoginPage.css";

export default function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        login(username, password).then((response) => {
            localStorage.setItem("token", response.access_token);
            window.location.href = "/";
        }).catch((error) => {
            console.error("Error en login:", error);
            setError("Usuario o contraseña incorrectos.");
        });
    };

    return (
        <Box component="form" className="login-form" onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom>
            Inicio de Sesión
        </Typography>
            <TextField
            label="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            variant="outlined"
            fullWidth
            required
            />
            <TextField
            label="Contraseña"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            variant="outlined"
            fullWidth
            required
            />
            {error && (
                <Typography color="error">
                    {error}
                </Typography>
            )}
            <Button variant="contained" color="primary" type="submit">
                Iniciar Sesión
            </Button>
        </Box>
    );
}