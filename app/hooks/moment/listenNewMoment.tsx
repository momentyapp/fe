import { useEffect } from "react";

import socket from "~/socket";

interface NewMoment {
  momentId: number;
  topicIds: number[];
}

export default function listenNewMoment(
  callback: (newMoment: NewMoment) => void
) {
  useEffect(() => {
    socket.on("new_moment", callback);

    return () => {
      socket.off("new_moment");
    };
  }, []);
}
