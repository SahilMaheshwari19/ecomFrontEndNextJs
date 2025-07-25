import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
    username : string|null;
    userrole: string|null;
}

const initialState: userState = {
    username: null,
    userrole: null
}

const userSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers : {
        setUserDetails: (state, action:PayloadAction<userState>) => {
            state.username = action.payload.username;
            state.userrole = action.payload.userrole;
        },
        clearUserDetails: (state) => {
            state.username = null;
            state.userrole = null;
        },
    },
});


export const {setUserDetails, clearUserDetails} = userSlice.actions;
export default userSlice.reducer;