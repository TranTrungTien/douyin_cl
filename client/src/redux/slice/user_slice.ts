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
  // extraReducers: (builder) => {
  //   builder.addCase(fetchUserAsync.pending, (state) => {
  //     return {
  //       ...state,
  //       status: "pending",
  //     };
  //   });
  //   builder.addCase(
  //     fetchUserAsync.fulfilled,
  //     (_, { payload }: PayloadAction<IUser>) => {
  //       return {
  //         status: "done",
  //         data: payload,
  //         error: null,
  //       };
  //     }
  //   );
  //   builder.addCase(fetchUserAsync.rejected, (_, action) => {
  //     return {
  //       status: "error",
  //       error: action.error,
  //       data: null,
  //     };
  //   });
  // },
});

export const {
  getUserInfoFailed,
  getUserInfoRequested,
  getUserInfoSuccessfully,
} = userSlice.actions;
export default userSlice.reducer;
