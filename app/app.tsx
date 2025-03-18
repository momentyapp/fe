import { useContext, useEffect } from "react";
import { ThemeContext } from "styled-components";
import { Outlet } from "react-router";
import ReactModal from "react-modal";

import useSessionRestore from "~/hooks/useSessionRestore";
import useTrendingTopics from "~/hooks/useTrendingTopics";

export default function App() {
  const theme = useContext(ThemeContext);

  // 모달 기본 설정
  useEffect(() => {
    if (theme === undefined) return;

    ReactModal.setAppElement("main");
    ReactModal.defaultStyles = {
      content: {
        background: theme.bg2,
      },
    };
  }, [theme]);

  // 세션 복원
  useSessionRestore();

  // 실시간 트렌드 주제 가져오기
  useTrendingTopics();

  return <Outlet />;
}
