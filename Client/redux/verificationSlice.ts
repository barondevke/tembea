import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type VerificationType } from "@/types/types";

const initialState: VerificationType = {
  name: null,
  email: null,
  password: null,
  id: null,
  date_created: new Date(),
};

const verificationSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setVerificationData: (state, action: PayloadAction<VerificationType>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setVerificationData } = verificationSlice.actions;
export default verificationSlice.reducer;