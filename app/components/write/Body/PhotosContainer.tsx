import { useContext, useRef } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdAddAPhoto } from "react-icons/md";

import Pressable from "~/components/common/Pressable";

import WritePhoto from "./WritePhoto";

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

interface PhotosContainerProps {
  photos: PhotoFile[];
  onPhotosChange: React.Dispatch<React.SetStateAction<PhotoFile[]>>;
}

export default function PhotosContainer({
  photos,
  onPhotosChange,
}: PhotosContainerProps) {
  const theme = useContext(ThemeContext);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleAddPhoto() {
    if (inputRef.current) inputRef.current.click();
  }

  function handleDeletePhoto(id: string) {
    onPhotosChange((prevPhotos) =>
      prevPhotos.filter((photo) => photo.id !== id)
    );
  }

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    const newPhotos = await Promise.all(
      Array.from(files).map(async (file) => ({
        id: URL.createObjectURL(file),
        file,
      }))
    );

    onPhotosChange((prevPhotos) => [...newPhotos, ...prevPhotos]);
  }

  return (
    <Wrapper>
      <AddPhotoButton onClick={handleAddPhoto}>
        <MdAddAPhoto size="36" color={theme?.grey1} />
      </AddPhotoButton>
      {photos.map((photo) => (
        <WritePhoto
          key={photo.id}
          photo={photo.id}
          onClick={() => {}}
          onDelete={() => handleDeletePhoto(photo.id)}
        />
      ))}
      <input
        type="file"
        accept="image/*"
        multiple
        ref={inputRef}
        onChange={handlePhotoChange}
        hidden
      />
    </Wrapper>
  );
}
