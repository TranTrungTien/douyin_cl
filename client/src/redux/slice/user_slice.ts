import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/user.interface";

type IStatus = "idle" | "loading" | "complete";

type IInitialState = {
  status: IStatus;
  data: IUser | null;
  error: SerializedError | null;
};

const initialState: IInitialState = {
  status: "idle",
  data: null,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    getUserInfoRequested: (state: IInitialState) => {
      const status: IStatus = "loading";
      return {
        ...state,
        status: status,
      };
    },
    getUserInfoSuccessfully: (
      state: IInitialState,
      { payload }: PayloadAction<IUser>
    ) => {
      const status: IStatus = "complete";

      return {
        status: status,
        data: payload,
        error: null,
      };
    },
    getUserInfoFailed: (state: IInitialState, action: any) => {
      const status: IStatus = "complete";

      return {
        status: status,
        data: null,
        error: action.error,
      };
    },
  },
});

export const {
  getUserInfoFailed,
  getUserInfoRequested,
  getUserInfoSuccessfully,
} = userSlice.actions;
export default userSlice.reducer;
