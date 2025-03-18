import { useEffect, useRef } from "react";

import type { PhotoFile } from "common";

export default function usePhotoHandler(
  onPhotosChange: React.Dispatch<React.SetStateAction<PhotoFile[]>>
) {
  const input = useRef(document.createElement("input"));

  useEffect(() => {
    const current = input.current;

    current.type = "file";
    current.accept = "image/*";
    current.multiple = true;
    current.hidden = true;
    current.onchange = async () => {
      const files = current.files;
      if (files === null) return;

      const newPhotos = await Promise.all(
        Array.from(files).map(async (file) => ({
          id: URL.createObjectURL(file),
          file,
        }))
      );

      current.files = null;
      onPhotosChange((prevPhotos) => [...newPhotos, ...prevPhotos]);
    };

    return () => {
      URL.revokeObjectURL(current.value);
      current.remove();
    };
  }, []);

  function handleAddPhoto() {
    input.current.click();
  }

  function handleDeletePhoto(id: string) {
    onPhotosChange((prevPhotos) =>
      prevPhotos.filter((photo) => photo.id !== id)
    );
  }

  return { handleAddPhoto, handleDeletePhoto };
}
