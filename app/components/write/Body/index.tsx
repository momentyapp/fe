import { styled } from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

import PhotoList from "./PhotoList";

import type { PhotoFile } from "common";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0 300px 0;
  width: 100%;
`;

const Input = styled(TextareaAutosize)`
  border: none;
  font-family: "Pretendard Variable", "Tossface";
  font-weight: 500;
  color: ${(props) => props.theme.grey1};
  background: transparent;
  font-size: 22px;
  outline: none;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: ${(props) => props.theme.grey3};
  }
`;

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
    <Wrapper>
      <Input
        placeholder="지금 생각을 적어보세요."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <PhotoList photos={photos} onPhotosChange={onPhotosChange} />
    </Wrapper>
  );
}
