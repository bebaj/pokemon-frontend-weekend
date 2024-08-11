import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Pokemon {
    id: number;
    name: string;
    weight: number;
    height: number;
    abilities: string[];
    isCaught: boolean;
}

interface PokemonState {
    caughtPokemons: Pokemon[];
}

const initialState: PokemonState = {
    caughtPokemons: [],
};

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        catchPokemon: (state, action: PayloadAction<Pokemon>) => {
            state.caughtPokemons.push(action.payload);
        },
        releasePokemon: (state, action: PayloadAction<number>) => {
            state.caughtPokemons = state.caughtPokemons.filter(
                (pokemon) => pokemon.id !== action.payload
            );
        },
    },
});

export const { catchPokemon, releasePokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
