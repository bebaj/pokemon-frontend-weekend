import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PokemonProfile from './pages/PokemonProfile';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/pokemon/:id"
                    element={
                        <PrivateRoute>
                            <PokemonProfile />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
