import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type UserType } from "@/types/types";

const initialState: UserType = {
  name: null,
  id: null,
  email: null,
  
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      Object.assign(state, action.payload);
    },
    clearUser: (state) => {
        Object.assign(state, initialState);
      },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;