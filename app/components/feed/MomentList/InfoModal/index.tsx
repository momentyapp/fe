import ReactModal from "react-modal";
import { useTheme } from "styled-components";
import {
  MdCalendarMonth,
  MdAutoDelete,
  MdReport,
  MdDelete,
} from "react-icons/md";

import Slide from "~/components/common/Slide";
import useSession from "~/contexts/useSession";

import Info from "./Info";

import * as S from "./index.style";

import type { Moment } from "common";

interface InfoModalProps extends Omit<ReactModal.Props, "style"> {
  moment?: Moment;
  onReport: () => void;
  onDelete: () => void;
}

export default function InfoModal({
  moment,
  onReport,
  onDelete,
  onRequestClose,
  isOpen,
  ...props
}: InfoModalProps) {
  const theme = useTheme();
  const session = useSession();

  return (
    <ReactModal
      closeTimeoutMS={200}
      onRequestClose={onRequestClose}
      isOpen={isOpen}
      {...props}
    >
      <S.Content>
        {/* 제목 */}
        <Slide visible={isOpen} delay={50}>
          <S.Title color={theme.grey1}>
            {moment?.author?.username ?? "익명"}의 모멘트
          </S.Title>
        </Slide>

        {/* 상세 */}
        <Slide visible={isOpen} delay={100}>
          <S.InfoContainer>
            <Info
              icon={<MdCalendarMonth size="24" color={theme.grey2} />}
              text={`${new Date(
                moment?.createdAt ?? 0
              ).toLocaleString()}에 작성`}
            />
            {moment?.expiresAt !== undefined && (
              <Info
                icon={<MdAutoDelete size="24" color={theme.grey2} />}
                text={`${new Date(
                  moment.expiresAt
                ).toLocaleString()}에 삭제 예정`}
              />
            )}
          </S.InfoContainer>
        </Slide>

        {/* 하단 버튼 */}
        <Slide visible={isOpen} delay={150}>
          <S.ActionContainer>
            <S.Action
              backgroundColor={theme.bg2}
              onClick={onReport}
              icon={<MdReport color={theme.grey1} size="24" />}
            >
              <S.ActionText color={theme.grey1}>
                부적절한 모멘트 신고
              </S.ActionText>
            </S.Action>
            {session.user !== undefined &&
              session.user?.id === moment?.author?.id && (
                <S.Action
                  backgroundColor={theme.bg2}
                  onClick={onDelete}
                  icon={<MdDelete color={theme.grey1} size="24" />}
                >
                  <S.ActionText color={theme.grey1}>삭제</S.ActionText>
                </S.Action>
              )}
          </S.ActionContainer>
        </Slide>
      </S.Content>
    </ReactModal>
  );
}
