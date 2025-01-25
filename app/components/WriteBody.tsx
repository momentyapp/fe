import { useState } from "react";
import { styled } from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

import WritePhoto from "~/components/WritePhoto";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
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

const PhotosContainer = styled.div`
  display: flex;
  height: 120px;
  padding: 0px 20px;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
`;

interface WriteBodyProps {
  value: string;
  onChange: (value: string) => void;
  photos: string[];
  onPhotosChange: (pictures: string[]) => void;
}

export default function WriteBody({
  value,
  onChange,
  photos,
  onPhotosChange,
}: WriteBodyProps) {
  return (
    <Wrapper>
      <Input
        placeholder="지금 생각을 적어보세요."
        onChange={(e) => onChange(e.target.value)}
      />
      <PhotosContainer>
        {photos.map((photo) => (
          <WritePhoto photo={photo} onClick={() => {}} onDelete={() => {}} />
        ))}
      </PhotosContainer>
    </Wrapper>
  );
}
