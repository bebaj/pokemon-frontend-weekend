import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { catchPokemon, releasePokemon } from '../store/slices/pokemonSlice';

const PokemonProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();

    // Provide a default value, such as '0', if `id` is undefined
    const pokemonId = id ? parseInt(id, 10) : 0;

    const pokemon = useSelector((state: RootState) =>
        state.pokemon.caughtPokemons.find((p) => p.id === pokemonId)
    );

    if (!pokemon) {
        return <div>Pokémon not found</div>;
    }

    const handleCatchRelease = () => {
        if (pokemon.isCaught) {
            dispatch(releasePokemon(pokemon.id));
        } else {
            dispatch(catchPokemon({ ...pokemon, isCaught: true }));
        }
    };

    return (
        <div>
            <h1>{pokemon.name}</h1>
            <img src={`https://img.pokemondb.net/artwork/large/${pokemon.name.toLowerCase()}.jpg`} alt={pokemon.name} />
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Abilities: {pokemon.abilities.join(', ')}</p>
            <button onClick={handleCatchRelease}>
                {pokemon.isCaught ? 'Release' : 'Catch'}
            </button>
        </div>
    );
};
export default PokemonProfile;