import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IMessages {
  uid: string;
  isVisible: boolean;
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
        if (state.every((state) => !state.isVisible)) {
          return [];
        } else return state;
      } else return state;
    },
    setMessage(state: IMessages[], action: PayloadAction<IMessages>) {
      state.push(action.payload);
    },
    setShow(state: IMessages[], action: PayloadAction<string>) {
      state.map(
        (item) => item.uid === action.payload && (item.isVisible = false)
      );
    },
  },
});

export const { setMessage, deleteMessage, setShow } = messageSlice.actions;
export default messageSlice.reducer;
