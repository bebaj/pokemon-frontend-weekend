import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    isAuthenticated: boolean;
    username: string;
    token: string;
}

const initialState: UserState = {
    isAuthenticated: false,
    username: '',
    token: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ username: string; token: string }>) => {
            state.isAuthenticated = true;
            state.username = action.payload.username;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.username = '';
            state.token = '';
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
