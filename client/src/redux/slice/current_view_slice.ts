import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStatistics } from "../../interfaces/statistic";
import { IVideo } from "../../interfaces/video.interface";

type IInitialState = {
  video: {
    doc: IVideo;
    statistics?: IStatistics;
  } | null;
};

const initialState: IInitialState = {
  video: null,
};

const currentViewSlice = createSlice({
  name: "current_views",
  initialState: initialState,
  reducers: {
    setVideo: (
      state: IInitialState,
      action: PayloadAction<{ doc: IVideo; statistics?: IStatistics }>
    ) => {
      state.video = action.payload;
    },
  },
});

export const { setVideo } = currentViewSlice.actions;
export default currentViewSlice.reducer;
