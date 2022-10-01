import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IMessages {
  uid: string;
  visibility: boolean;
  forever: boolean;
  duration: number;
  type: "success" | "warning" | "danger" | "primary";
  text: string;
}

const initialState: IMessages[] | [] = [];

const messageSlice = createSlice({
  name: "message",
  initialState: initialState,
  reducers: {
    deleteMessage(state: IMessages[], action: PayloadAction<void>) {
      if (state.length > 0) {
        const newState = state.filter((state) => state.forever);
        return newState;
      }
    },
    setMessage(state: IMessages[], action: PayloadAction<IMessages>) {
      state.push(action.payload);
    },
    setShow(state: IMessages[], action: PayloadAction<string>) {
      state.map(
        (item) => item.uid === action.payload && (item.visibility = false)
      );
    },
    deleteVisibilityForeverMessage(
      state: IMessages[],
      action: PayloadAction<string>
    ) {
      const newMessage = state.filter((item) => item.uid !== action.payload);
      return newMessage;
    },
  },
});

export const {
  setMessage,
  deleteMessage,
  setShow,
  deleteVisibilityForeverMessage,
} = messageSlice.actions;
export default messageSlice.reducer;
