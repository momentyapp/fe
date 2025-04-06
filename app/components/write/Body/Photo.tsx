import { styled, useTheme } from "styled-components";
import { MdDelete } from "react-icons/md";

import Pressable from "~/components/common/Pressable";

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

interface PhotoProps {
  photo: string;
  onClick: () => void;
  onDelete: () => void;
}

export default function Photo({ photo, onClick, onDelete }: PhotoProps) {
  const theme = useTheme();

  return (
    <>
      <Wrapper>
        <StyledImg src={photo} onClick={onClick} />
        <DeleteButton onClick={onDelete}>
          <MdDelete size="18" color={theme.grey1} />
        </DeleteButton>
      </Wrapper>
    </>
  );
}
