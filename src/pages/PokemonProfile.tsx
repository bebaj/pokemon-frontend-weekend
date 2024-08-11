import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface PokemonDetails {
    id: number;
    name: string;
    imageUrl: string;
    weight: number;
    height: number;
    abilities: string[];
}

const PokemonProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const data = response.data;
                const abilities = data.abilities
                    .filter((ability: { is_hidden: boolean }) => !ability.is_hidden)
                    .map((ability: { ability: { name: string } }) => ability.ability.name);

                setPokemon({
                    id: data.id,
                    name: data.name,
                    imageUrl: data.sprites.front_default,
                    weight: data.weight,
                    height: data.height,
                    abilities,
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Pokémon details:', error);
                setLoading(false);
            }
        };

        fetchPokemonDetails();
    }, [id]);

    if (loading) {
        return <div className="loading">Loading Pokémon details...</div>;
    }

    if (!pokemon) {
        return <div>Pokémon not found.</div>;
    }

    return (
        <div className="pokemon-profile">
            <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
            <img src={pokemon.imageUrl} alt={pokemon.name} />
            <p>Height: {pokemon.height} decimetres</p>
            <p>Weight: {pokemon.weight} hectograms</p>
            <p>Abilities: {pokemon.abilities.join(', ')}</p>
        </div>
    );
};

export default PokemonProfile;