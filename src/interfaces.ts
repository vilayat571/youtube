export interface InitialState {
  videos: HomePageVideos[] | undefined;
  currentVideo: CurrentVideo | null;
  query: string;
  results: [];
  nextPageToken: string | null;
  recommendedVideos: RecommendedVideos[];
}

export interface HomePageVideos {
  videoId: string;
  videoTitle: string;
  videoDescription: string;
  videoLink: string;

  videoThumbnail: string;
  videoDuration: string;
  videoViews: string;
  videoAge: string;
  channelInfo: {
    id: string;
    image: string;
    name: string;
  };
}

export interface CurrentVideo {}

export interface RecommendedVideos {}
