import { ReactElement } from "react";
import HomePageLayout from "@/layout/Home";
import { useVideo } from "@/context/videos";
import VideoTeaser from "@/components/VideoTeaser";
import { SimpleGrid } from "@mantine/core";

export default function Home() {
  const { videos } = useVideo();
  return (
    <div>
      <SimpleGrid cols={3}>
        {(videos || []).map((video) => {
          return <VideoTeaser video={video} key={video.videoId}></VideoTeaser>;
        })}
      </SimpleGrid>
    </div>
  );
}

Home.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
