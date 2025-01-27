import { useContext } from "react";
import ReactModal from "react-modal";
import { styled, ThemeContext } from "styled-components";
import {
  MdCalendarMonth,
  MdAutoDelete,
  MdReport,
  MdDelete,
} from "react-icons/md";

import Button from "~/components/Button";
import Typography from "~/components/Typography";
import Slide from "~/components/Slide";
import SessionContext from "~/contexts/session";

import Info from "./Info";
import type { Moment } from "common";

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

interface MomentModalProps extends Omit<ReactModal.Props, "style"> {
  moment: Moment;
  onReport: () => void;
  onDelete: () => void;
}

export default function MomentModal({
  moment,
  onReport,
  onDelete,
  onRequestClose,
  isOpen,
  ...props
}: MomentModalProps) {
  const theme = useContext(ThemeContext);
  const session = useContext(SessionContext);

  return (
    <ReactModal
      closeTimeoutMS={200}
      onRequestClose={onRequestClose}
      isOpen={isOpen}
      {...props}
    >
      <Content>
        {/* 제목 */}
        <Slide
          visible={isOpen}
          delay={50}
          timingFunction="cubic-bezier(0.17,0.84,0.44,1)"
        >
          <Typography color={theme?.grey1} size="24px" weight="700">
            {moment.author?.username ?? "익명"}의 모멘트
          </Typography>
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
              text={`${new Date(moment.createdAt).toLocaleString()}에 작성`}
            />
            {moment.expiresAt !== undefined && (
              <Info
                icon={<MdAutoDelete size="24" color={theme?.grey2} />}
                text={`${new Date(
                  moment.expiresAt
                ).toLocaleString()}에 삭제 예정`}
              />
            )}
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
              onClick={onReport}
              icon={<MdReport color={theme?.grey1} size="24" />}
            >
              <Typography color={theme?.grey1} size="18px">
                부적절한 모멘트 신고
              </Typography>
            </Action>
            {session.session !== undefined &&
              session.session.user?.id === moment.author?.id && (
                <Action
                  backgroundColor={theme?.bg2}
                  onClick={onDelete}
                  icon={<MdDelete color={theme?.grey1} size="24" />}
                >
                  <Typography color={theme?.grey1} size="18px">
                    삭제
                  </Typography>
                </Action>
              )}
          </Actions>
        </Slide>
      </Content>
    </ReactModal>
  );
}
