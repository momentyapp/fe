import { useContext, useState } from "react";
import { styled, ThemeContext } from "styled-components";

import WriteBar from "~/components/WriteBar";
import WriteBody from "~/components/WriteBody";

export default function Write() {
  const theme = useContext(ThemeContext);

  const [text, setText] = useState("");
  const [photos, setPhotos] = useState<string[]>([
    "https://picsum.photos/1000",
    "https://picsum.photos/400/800",
  ]);

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
