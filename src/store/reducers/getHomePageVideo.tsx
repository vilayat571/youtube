import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { HomePageVideos } from "../../interfaces";
import { YOUTUBE_API_URL } from "../../utils/consts";
import { parseData } from "../../utils/importants";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getHomePageVideos = createAsyncThunk(
  "/getVideos/",
  async (isNext: boolean, { getState }) => {
    const {
      youtubeReducer: { nextPageToken: nextPageTokenFromState, videos },
    } = getState() as RootState;
    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE_API_URL}/search?maxResults=20&q="reactjs projects"&key=${API_KEY}&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ""
      }`
    );
    /* @ts-ignore */
    const dataParse: HomePageVideos[] = await parseData(items);
    /* @ts-ignore */

    return { dataParse: [...videos, ...dataParse], nextPageToken };
  }
);