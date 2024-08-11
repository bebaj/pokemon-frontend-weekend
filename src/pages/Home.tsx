import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import SearchBar from '../components/SearchBar';

interface Pokemon {
    id: number;
    name: string;
    imageUrl: string;
    types: string[];
}

const Home: React.FC = () => {
    const [types, setTypes] = useState<string[]>([]);
    const [selectedType, setSelectedType] = useState('');
    const [search, setSearch] = useState('');
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // React Router's navigate hook

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/type');
                const typeNames = response.data.results.map((type: { name: string }) => type.name);
                setTypes(typeNames);
            } catch (error) {
                console.error('Error fetching Pokémon types:', error);
            }
        };

        fetchTypes();
    }, []);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
                const pokemonDetails = await Promise.all(
                    response.data.results.map(async (pokemon: { name: string; url: string }) => {
                        const pokemonData = await axios.get(pokemon.url);
                        return {
                            id: pokemonData.data.id,
                            name: pokemonData.data.name,
                            imageUrl: pokemonData.data.sprites.front_default,
                            types: pokemonData.data.types.map((type: { type: { name: string } }) => type.type.name),
                        };
                    })
                );
                setPokemons(pokemonDetails);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
                setLoading(false);
            }
        };

        fetchPokemons();
    }, []);

    const filteredPokemons = pokemons.filter((pokemon) => {
        const matchesSearch = pokemon.name.toLowerCase().includes(search.toLowerCase());
        const matchesType = selectedType ? pokemon.types.includes(selectedType) : true;
        return matchesSearch && matchesType;
    });

    const handlePokemonClick = (id: number) => {
        navigate(`/pokemon/${id}`);
    };

    if (loading) {
        return <div className="loading">Loading Pokémons...</div>;
    }

    return (
        <div className="home-container">
            <h1>Pokémon App</h1>
            <div className="filter-container">
                <Dropdown options={types} onChange={setSelectedType} />
                <SearchBar value={search} onChange={setSearch} />
            </div>
            <ul className="pokemon-list">
                {filteredPokemons.map((pokemon) => (
                    <li key={pokemon.id} className="pokemon-item" onClick={() => handlePokemonClick(pokemon.id)}>
                        <img src={pokemon.imageUrl} alt={pokemon.name} />
                        <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
