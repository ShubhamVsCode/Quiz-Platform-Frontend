// RichText.tsx in your components folder
import { Skeleton } from "@mantine/core";
import dynamic from "next/dynamic";

export default dynamic(() => import("@mantine/rte"), {
  // Disable during server side rendering
  ssr: false,

  // Render anything as fallback on server, e.g. loader or html content without editor
  loading: () => <Skeleton visible={true} height={"110px"}></Skeleton>,
});
