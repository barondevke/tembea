import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type UserType } from "@/types/types";

const initialState: UserType = {
  name: "",
  id: null,
  email: null,
  enabled: null,
  date_created: null,
  profile_image: null,
  role:null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      // Check if date_created is a Date object and convert it to ISO string
      const payload = {
        ...action.payload,
        date_created:
          action.payload.date_created instanceof Date
            ? action.payload.date_created.toISOString()
            : action.payload.date_created,
      };

      Object.assign(state, payload);
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;