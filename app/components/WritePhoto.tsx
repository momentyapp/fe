import { useContext } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdDelete } from "react-icons/md";

import Pressable from "~/components/Pressable";

const Wrapper = styled.div`
  position: relative;
`;

const StyledImg = styled.img`
  max-height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const DeleteButton = styled(Pressable)`
  position: absolute;
  right: 6px;
  bottom: 6px;
  background: ${(props) => props.theme.bg1};
  border-radius: 50%;
  width: 32px;
  height: 32px;
`;

interface WritePhotoProps {
  photo: string;
  onClick: () => void;
  onDelete: () => void;
}

export default function WritePhoto({
  photo,
  onClick,
  onDelete,
}: WritePhotoProps) {
  const theme = useContext(ThemeContext);

  return (
    <Wrapper>
      <StyledImg src={photo} onClick={onClick} />
      <DeleteButton onClick={onDelete}>
        <MdDelete size="18" color={theme?.grey1} />
      </DeleteButton>
    </Wrapper>
  );
}
