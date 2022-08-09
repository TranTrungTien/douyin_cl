import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { IFollowing } from "../../interfaces/following";
import { IUser } from "../../interfaces/user.interface";

type IStatus = "idle" | "loading" | "complete";

type IInitialState = {
  status: IStatus;
  list: IFollowing[] | null;
  error: SerializedError | null;
};

const initialState: IInitialState = {
  status: "idle",
  list: null,
  error: null,
};

// export const fetchUserAsync = createAsyncThunk(
//   "fetchUserAsync/user",
//   async () => {
//     try {
//       const userData = await axios.get<{ message: string; doc: IUser }>(
//         "user/",
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       return userData.data.doc;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

const followingSlice = createSlice({
  name: "following",
  initialState: initialState,
  reducers: {
    getAllFollowingRequested: (state: IInitialState) => {
      const status: IStatus = "loading";
      return {
        ...state,
        status: status,
      };
    },
    getAllFollowingSuccessfully: (
      state: IInitialState,
      { payload }: PayloadAction<IFollowing[]>
    ) => {
      const status: IStatus = "complete";
      return {
        status: status,
        list: payload,
        error: null,
      };
    },
    getAllFollowingFailed: (state: IInitialState, action: any) => {
      const status: IStatus = "complete";

      return {
        status: status,
        list: null,
        error: action.error,
      };
    },
  },
});

export const {
  getAllFollowingFailed,
  getAllFollowingRequested,
  getAllFollowingSuccessfully,
} = followingSlice.actions;
export default followingSlice.reducer;
