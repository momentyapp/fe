import { useTheme } from "styled-components";
import { MdAddAPhoto } from "react-icons/md";

import usePhotoHandler from "~/hooks/usePhotoHandler";

import Photo from "./Photo";

import * as S from "./PhotoList.style";

import type { PhotoFile } from "common";

interface PhotoListProps {
  photos: PhotoFile[];
  onPhotosChange: React.Dispatch<React.SetStateAction<PhotoFile[]>>;
}

export default function PhotoList({ photos, onPhotosChange }: PhotoListProps) {
  const theme = useTheme();

  const { handleAddPhoto, handleDeletePhoto } = usePhotoHandler(onPhotosChange);

  return (
    <S.Wrapper>
      <S.AddButton backgroundColor={theme.bg3} onClick={handleAddPhoto}>
        <MdAddAPhoto size="36" color={theme.grey1} />
      </S.AddButton>

      {photos.map((photo) => (
        <Photo
          key={photo.id}
          photo={photo.id}
          onClick={() => {}}
          onDelete={() => handleDeletePhoto(photo.id)}
        />
      ))}
    </S.Wrapper>
  );
}
