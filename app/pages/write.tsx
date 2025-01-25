import { useContext, useState } from "react";
import { styled, ThemeContext } from "styled-components";

import WriteBar from "~/components/WriteBar";
import WriteBody from "~/components/WriteBody";

import type { PhotoFile } from "common";

export default function Write() {
  const theme = useContext(ThemeContext);

  const [text, setText] = useState("");
  const [photos, setPhotos] = useState<PhotoFile[]>([]);

  return (
    <>
      {/* 상단 바 */}
      <WriteBar />

      {/* 본문 */}
      <WriteBody
        value={text}
        onChange={setText}
        photos={photos}
        onPhotosChange={setPhotos}
      />
    </>
  );
}
