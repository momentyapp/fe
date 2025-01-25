import { useContext } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdDelete } from "react-icons/md";

import Pressable from "~/components/Pressable";

const Wrapper = styled.div`
  height: 120px;
  position: relative;
`;

const StyledImg = styled.img`
  height: 100%;
  min-width: 100px;
  object-fit: cover;
  border-radius: 5px;
`;

const DeleteButton = styled(Pressable)`
  position: absolute;
  right: 6px;
  bottom: 6px;
  background: ${(props) => props.theme.bg1};
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
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
    <>
      <Wrapper>
        <StyledImg src={photo} onClick={onClick} />
        <DeleteButton onClick={onDelete}>
          <MdDelete size="18" color={theme?.grey1} />
        </DeleteButton>
      </Wrapper>
    </>
  );
}
