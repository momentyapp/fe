import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, type DefaultTheme } from "styled-components";
import { Outlet } from "react-router";
import ReactModal from "react-modal";

import "react-photo-view/dist/react-photo-view.css";

import GlobalStyle from "~/styles/global";
import palette from "~/styles/palette";

import useSessionRestore from "~/hooks/useSessionRestore";
import useTrendingTopics from "~/hooks/useTrendingTopics";

const queryClient = new QueryClient();

export default function App() {
  const [theme, setTheme] = useState<DefaultTheme>(palette.dark);

  // 모달 기본 설정
  useEffect(() => {
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

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Outlet />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
