import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import pokemonReducer from './slices/pokemonSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        pokemon: pokemonReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;