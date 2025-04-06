import PhotoList from "./PhotoList";

import * as S from "./index.style";

import type { PhotoFile } from "common";

interface BodyProps {
  value: string;
  onChange: (value: string) => void;
  photos: PhotoFile[];
  onPhotosChange: React.Dispatch<React.SetStateAction<PhotoFile[]>>;
}

export default function Body({
  value,
  onChange,
  photos,
  onPhotosChange,
}: BodyProps) {
  return (
    <S.Wrapper>
      <S.Input
        placeholder="지금 생각을 적어보세요."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <PhotoList photos={photos} onPhotosChange={onPhotosChange} />
    </S.Wrapper>
  );
}
