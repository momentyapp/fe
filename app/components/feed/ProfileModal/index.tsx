import ReactModal from "react-modal";
import { useTheme } from "styled-components";
import {
  MdCalendarMonth,
  MdDelete,
  MdExitToApp,
  MdAccountCircle,
} from "react-icons/md";

import Slide from "~/components/common/Slide";

import useSession from "~/contexts/useSession";

import Detail from "./Detail";

import * as S from "./index.style";

import type { User } from "common";

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
  const theme = useTheme();
  const session = useSession();

  const photo = session?.user?.photo;

  return (
    <ReactModal
      closeTimeoutMS={200}
      onRequestClose={onRequestClose}
      isOpen={isOpen}
      {...props}
    >
      <S.Content>
        {/* 아바타 */}
        <Slide visible={isOpen} delay={50}>
          <S.Top>
            <S.StyledPressable backgroundColor={theme.bg2}>
              {photo ? (
                <S.Photo
                  src={`${import.meta.env.VITE_HOST}/file/profile/${photo}`}
                />
              ) : (
                <MdAccountCircle size="72" color={theme.grey1} />
              )}
            </S.StyledPressable>

            <S.Name color={theme.grey1}>{user.username}</S.Name>
          </S.Top>
        </Slide>

        {/* 상세 */}
        <Slide visible={isOpen} delay={100}>
          <S.DetailContainer>
            <Detail
              icon={<MdCalendarMonth size="20" color={theme.grey2} />}
              text={`${new Date(user.createdAt).toLocaleDateString()} 가입`}
            />
          </S.DetailContainer>
        </Slide>

        {/* 하단 버튼 */}
        <Slide visible={isOpen} delay={150}>
          <S.Actions>
            <S.Action
              backgroundColor={theme.bg2}
              onClick={onLogout}
              icon={<MdExitToApp color={theme.grey1} size="24" />}
            >
              <S.ActionText color={theme.grey1}>로그아웃</S.ActionText>
            </S.Action>

            <S.Action
              backgroundColor={theme.bg2}
              onClick={onDelete}
              icon={<MdDelete color={theme.grey1} size="24" />}
            >
              <S.ActionText color={theme.grey1}>탈퇴</S.ActionText>
            </S.Action>
          </S.Actions>
        </Slide>
      </S.Content>
    </ReactModal>
  );
}
