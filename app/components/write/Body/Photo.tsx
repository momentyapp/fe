import { useTheme } from "styled-components";
import { MdDelete } from "react-icons/md";

import * as S from "./Photo.style";

interface PhotoProps {
  photo: string;
  onClick: () => void;
  onDelete: () => void;
}

export default function Photo({ photo, onClick, onDelete }: PhotoProps) {
  const theme = useTheme();

  return (
    <S.Wrapper>
      <S.ImageWrapper src={photo} onClick={onClick} />
      <S.DeleteButton onClick={onDelete}>
        <MdDelete size="18" color={theme.grey1} />
      </S.DeleteButton>
    </S.Wrapper>
  );
}
