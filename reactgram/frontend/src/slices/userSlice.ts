import { User } from '../interfaces/User';
import { UserState } from '../interfaces/UserState';

// Funções que lidam com a api
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../services/userService';
import { RootState } from '../store';
import { AuthUser } from '../interfaces/AuthUser';

const initialState: UserState = {
    user: null, // No curso passou como {}
    error: false,
    success: false,
    loading: false,
    message: null,
};

// Get user details
export const  profile = createAsyncThunk<
    User, // Tipo esperado no fulfilled
    void, // Tipo do argumento passado para a função
    { rejectValue: string , state: RootState} // Tipo do rejectWithValue
>(
    "user/profile",
    async(_, thunkAPI) => {

        const authUser = thunkAPI.getState().auth.user as AuthUser;
        
        if (!authUser?.token) {
            return thunkAPI.rejectWithValue("Token JWT não encontrado");
        }
        console.log("T: ", authUser.token);
        const data = await userService.profile(authUser.token);

        return data;

    }
)

export const userSlice = createSlice({
    name: "user", initialState, reducers: {
        resetMessage: (state) => {
            state.message = null;
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(profile.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(profile.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.user = action.payload; // `action.payload` foi definido como `User`
        });
    }
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;