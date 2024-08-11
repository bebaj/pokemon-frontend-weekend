import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PokemonProfile from './pages/PokemonProfile';
import Login from './pages/Login';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/pokemon/:id" element={<PokemonProfile />} />
            </Routes>
        </Router>
    );
};

export default App;