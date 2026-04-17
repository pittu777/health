import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthUser {
    id: string;
    name: string;
    email: string;
}

interface UserState {
    currentUser: AuthUser | null;
    status: "guest" | "authenticated";
}

const initialState: UserState = {
    currentUser: null,
    status: "guest",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<AuthUser>) {
            state.currentUser = action.payload;
            state.status = "authenticated";
        },
        clearUser(state) {
            state.currentUser = null;
            state.status = "guest";
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
