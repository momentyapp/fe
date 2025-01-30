import { useContext } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdAddAPhoto } from "react-icons/md";

import Pressable from "~/components/common/Pressable";
import usePhotoHandler from "~/hooks/write/usePhotoHandler";

import Photo from "./Photo";

import type { PhotoFile } from "common";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 20px;
  gap: 10px;
  overflow-x: auto;
  box-sizing: border-box;
`;

const AddPhotoButton = styled(Pressable)`
  display: flex;
  min-width: 120px;
  height: 120px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: ${(props) => props.theme.bg3};
  padding: 0;
`;

interface PhotoListProps {
  photos: PhotoFile[];
  onPhotosChange: React.Dispatch<React.SetStateAction<PhotoFile[]>>;
}

export default function PhotoList({
  photos,
  onPhotosChange,
}: PhotoListProps) {
  const theme = useContext(ThemeContext);

  const { handleAddPhoto, handleDeletePhoto } = usePhotoHandler(onPhotosChange);

  return (
    <Wrapper>
      <AddPhotoButton onClick={handleAddPhoto}>
        <MdAddAPhoto size="36" color={theme?.grey1} />
      </AddPhotoButton>
      {photos.map((photo) => (
        <Photo
          key={photo.id}
          photo={photo.id}
          onClick={() => {}}
          onDelete={() => handleDeletePhoto(photo.id)}
        />
      ))}
    </Wrapper>
  );
}
