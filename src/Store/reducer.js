import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "user",
    initialState: {name: "Sai Ram"},
    reducers: {
        returnUser: (user,action) => {
            return user;
        },
    }
});

export const {returnUser} = slice.actions;
export default slice.reducer;