import Header from "./components/Header";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import ArtistList from "./pages/ArtistList";
import AlbumList from "./pages/AlbumList";
import ArtistForm from "./components/ArtistForm";
import AlbumForm from "./components/AlbumForm";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Container sx={{ mt: 4 }}>
                <Routes>
                    <Route path="/" element={<ArtistList />}/>
                    <Route path="/albums" element={<AlbumList />}/>
                    <Route path="/artists/add" element={<ArtistForm />}/>
                    <Route path="/albums/add" element={<AlbumForm />}/>
                    <Route path="/albums/edit/:id" element={<AlbumForm />}/>
                    <Route path="/artists/edit/:id" element={<ArtistForm />}/>
                    <Route path="/login" element={<LoginPage />}/>
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;