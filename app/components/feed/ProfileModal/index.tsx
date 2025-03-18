import { useContext } from "react";
import ReactModal from "react-modal";
import { styled, ThemeContext } from "styled-components";
import {
  MdCalendarMonth,
  MdDelete,
  MdExitToApp,
  MdAccountCircle,
} from "react-icons/md";

import Button from "~/components/common/Button";
import Typography from "~/components/common/Typography";
import Slide from "~/components/common/Slide";
import Pressable from "~/components/common/Pressable";

import useSession from "~/contexts/useSession";

import Info from "./Info";

import type { User } from "common";

const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Name = styled(Typography)`
  text-align: center;
`;

const Content = styled.div`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Infos = styled.div`
  display: flex;
  padding: 10px 0;
  flex-direction: column;
  gap: 10px;
`;

const Actions = styled.div`
  display: flex;
  padding: 10px 0;
  flex-direction: column;
  gap: 5px;
`;

const Action = styled(Button)`
  display: flex;
  padding: 15px 10px;
  align-items: center;
  gap: 10px;
  border-radius: 15px;
  justify-content: flex-start;
`;

const StyledPressable = styled(Pressable)`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Photo = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;
`;

interface ProfileModalProps extends Omit<ReactModal.Props, "style"> {
  user: User;
  onLogout: () => void;
  onDelete: () => void;
}

export default function ProfileModal({
  user,
  onLogout,
  onDelete,
  onRequestClose,
  isOpen,
  ...props
}: ProfileModalProps) {
  const theme = useContext(ThemeContext);
  const session = useSession();

  const photo = session?.user?.photo;

  return (
    <ReactModal
      closeTimeoutMS={200}
      onRequestClose={onRequestClose}
      isOpen={isOpen}
      {...props}
    >
      <Content>
        {/* 아바타 */}
        <Slide
          visible={isOpen}
          delay={50}
          timingFunction="cubic-bezier(0.17,0.84,0.44,1)"
        >
          <Avatar>
            <StyledPressable backgroundColor={theme?.bg2}>
              {photo ? (
                <Photo
                  src={`${import.meta.env.VITE_HOST}/file/profile/${photo}`}
                />
              ) : (
                <MdAccountCircle size="72" color={theme?.grey1} />
              )}
            </StyledPressable>

            <Name color={theme?.grey1} size="24px" weight="700">
              {user.username}
            </Name>
          </Avatar>
        </Slide>

        {/* 상세 */}
        <Slide
          visible={isOpen}
          delay={100}
          timingFunction="cubic-bezier(0.17,0.84,0.44,1)"
        >
          <Infos>
            <Info
              icon={<MdCalendarMonth size="24" color={theme?.grey2} />}
              text={`${new Date(user.createdAt).toLocaleDateString()} 가입`}
            />
          </Infos>
        </Slide>

        {/* 하단 버튼 */}
        <Slide
          visible={isOpen}
          delay={150}
          timingFunction="cubic-bezier(0.17,0.84,0.44,1)"
        >
          <Actions>
            <Action
              backgroundColor={theme?.bg2}
              onClick={onLogout}
              icon={<MdExitToApp color={theme?.grey1} size="24" />}
            >
              <Typography color={theme?.grey1} size="18px">
                로그아웃
              </Typography>
            </Action>

            <Action
              backgroundColor={theme?.bg2}
              onClick={onDelete}
              icon={<MdDelete color={theme?.grey1} size="24" />}
            >
              <Typography color={theme?.grey1} size="18px">
                탈퇴
              </Typography>
            </Action>
          </Actions>
        </Slide>
      </Content>
    </ReactModal>
  );
}
