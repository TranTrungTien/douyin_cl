import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../interfaces/user.interface";

type IInitialState = {
  status: string;
  data: IUser | null;
  error: SerializedError | null;
};

const initialState: IInitialState = {
  status: "pending",
  data: null,
  error: null,
};
export const fetchUserAsync = createAsyncThunk<IUser>(
  "fetchUserAsync/user",
  async () => {
    try {
      const userData = await axios.get("user/", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return userData.data;
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    saveUser: (state: IInitialState, { payload }: PayloadAction<IUser>) => {
      return {
        status: "done",
        data: payload,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserAsync.pending, (state) => {
      return {
        ...state,
        status: "pending",
      };
    });
    builder.addCase(
      fetchUserAsync.fulfilled,
      (_, { payload }: PayloadAction<IUser>) => {
        return {
          status: "done",
          data: payload,
          error: null,
        };
      }
    );
    builder.addCase(fetchUserAsync.rejected, (_, action) => {
      return {
        status: "error",
        error: action.error,
        data: null,
      };
    });
  },
});

export const { saveUser } = userSlice.actions;
export default userSlice.reducer;
