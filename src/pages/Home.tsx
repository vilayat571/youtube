import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import { HomePageVideos } from "../interfaces";
import { clearVideos } from "../store";
import { useAppSelector } from "../store/hooks";
import { getHomePageVideos } from "../store/reducers/getHomePageVideo";

export default function Home() {
  const dispatch = useDispatch();

  const videos = useAppSelector((state) => state.youtubeReducer.videos);

  useEffect(() => {
    return () => {
      //@ts-ignore
      dispatch(clearVideos());
    };
  }, [dispatch]);

  useEffect(() => {
    /* @ts-ignore */
    dispatch(getHomePageVideos(false));
  }, [dispatch]);

  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <Sidebar />
        {videos?.length ? (
          <InfiniteScroll
            dataLength={videos?.length}
            next={() =>
              //@ts-ignore
              dispatch(getHomePageVideos(true))
            }
            hasMore={videos.length < 500}
            loader={<Spinner />}
            height={650}
          >
            <div className="grid gap-y-14 grid-cols-4 gap-x-8 p-8">
              {videos.map((item: HomePageVideos, index) => {
                return <Card data={item} key={index} />;
              })}
            </div>
          </InfiniteScroll>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
