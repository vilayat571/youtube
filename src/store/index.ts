import { InitialState } from "../interfaces";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getHomePageVideos } from "./reducers/getHomePageVideo";
import { getSearchPageVideos } from "./reducers/getSearchPageVideos";

const initialState: Partial<InitialState> = {
  videos: [],
  currentVideo: [],
  query: "",
  results: [],
  nextPageToken: null,
  recommendedVideos: [],
};

const youtubeSlice = createSlice({
  name: "youtubeReducer",
  initialState,
  reducers: {
    clearVideos: (state) => {
      state.videos = [];
      state.nextPageToken = null;
    },
    changeSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    clearSearchQuery: (state, action) => {
      state.query = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
      console.log("payload", action.payload);
      state.videos = action.payload.dataParse;
      state.nextPageToken = action.payload.nextPageToken;
    });
    builder.addCase(getSearchPageVideos.fulfilled, (state, action) => {
      console.log("payload", action.payload);
      state.videos = action.payload.dataParse;
      state.nextPageToken = action.payload.nextPageToken;
    });
  },
});

export const { clearVideos, changeSearchQuery, clearSearchQuery } =
  youtubeSlice.actions;
export default youtubeSlice;

export const store = configureStore({
  reducer: {
    youtubeReducer: youtubeSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
