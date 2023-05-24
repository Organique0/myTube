import { ReactElement } from "react";
import HomePageLayout from "@/layout/Home";

export default function Home() {
  return <div></div>;
}

Home.getLayout = function (page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
