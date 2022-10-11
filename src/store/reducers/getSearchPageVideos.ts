import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { HomePageVideos } from "../../interfaces";
import { YOUTUBE_API_URL } from "../../utils/consts";
import { parseData } from "../../utils/importants";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getSearchPageVideos = createAsyncThunk(
  "/getSearchPageVideos/",
  async (isNext: boolean, { getState }) => {
    const {
      youtubeReducer: {
        nextPageToken: nextPageTokenFromState,
        videos,
        //@ts-ignore
        query,
      },
    } = getState() as RootState;
    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE_API_URL}/search?q=${query}&key=${API_KEY}&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ""
      }`
    );
    /* @ts-ignore */
    const dataParse: HomePageVideos[] = await parseData(items);
    /* @ts-ignore */
    return { dataParse: [...videos, ...dataParse], nextPageToken };
  }
);
