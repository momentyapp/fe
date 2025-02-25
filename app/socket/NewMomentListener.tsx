import { useContext, useEffect } from "react";

import API from "~/apis";
import socket from "~/socket";

import CacheContext from "~/contexts/cache";

interface NewMoment {
  momentId: number;
  topicIds: number[];
}

export default function NewMomentListener() {
  const cache = useContext(CacheContext);

  useEffect(() => {
    socket.on("new_moment", async ({ momentId }: NewMoment) => {
      const response = await API.moment.getMomentById({ momentId });
      const { code, message, result } = response.data;

      if (code === "success" && result !== undefined) {
        const { moment } = result;

        cache.addMoments([moment]);
      }
    });

    return () => {
      socket.off("new_moment");
    };
  }, []);

  return <></>;
}
