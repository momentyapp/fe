import { useEffect } from "react";

import socket from "~/socket";

interface NewMoment {
  momentId: number;
  topicIds: number[];
}

/**
 * 모멘트가 업데이트됐을 때 콜백 함수를 호출하는 훅
 * @param callback 새 모멘트가 추가됐을 때 호출할 콜백 함수
 */
export default function useHandleMomentUpdate(
  callback: (newMoment: NewMoment) => void
) {
  useEffect(() => {
    socket.on("new_moment", callback);

    return () => {
      socket.off("new_moment");
    };
  }, [callback]);
}
