import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IInitialState = {
  isLogin: boolean;
};

const initialState: IInitialState = {
  isLogin: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setIsLogin: (state: IInitialState, action: PayloadAction<boolean>) => {
      return {
        isLogin: action.payload,
      };
    },
  },
});

export const { setIsLogin } = loginSlice.actions;
export default loginSlice.reducer;
