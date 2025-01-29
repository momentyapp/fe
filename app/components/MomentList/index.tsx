import { useState, useContext } from "react";
import { styled } from "styled-components";

import API from "~/apis";
import Moment from "~/components/Moment";
import SessionContext from "~/contexts/session";

import Modals from "./Modals";

import type { Moment as MomentType } from "common";

const Wrapper = styled.div`
  display: flex;
  padding: 10px 10px 100px 10px;
  flex-direction: column;
  gap: 10px;
`;

interface MomentListProps {
  moments: MomentType[];
  setMoments: React.Dispatch<React.SetStateAction<MomentType[]>>;
  my?: number;
}

export default function MomentList({
  moments,
  setMoments,
  my,
}: MomentListProps) {
  const session = useContext(SessionContext);

  const [detailModalMoment, setDetailModalMoment] = useState<MomentType | null>(
    null
  );
  const [emojiModalMoment, setEmojiModalMoment] = useState<MomentType | null>(
    null
  );

  const [needLoginModalOpen, setNeedLoginModalOpen] = useState(false);

  // 반응 추가 함수
  function handleAddReaction(momentId: number, emoji: string) {
    if (session.session === undefined) {
      setNeedLoginModalOpen(true);
      return;
    }

    API.moment.reactMoment(
      { momentId, emoji },
      session.session.accessToken.token
    );
  }

  // 반응 제거 함수
  function handleRemoveReaction(momentId: number) {
    if (session.session === undefined) {
      setNeedLoginModalOpen(true);
      return;
    }

    API.moment.reactMoment(
      { momentId, emoji: null },
      session.session.accessToken.token
    );
  }

  // 이모지 선택 함수
  function handleSelectEmoji(moment: MomentType, emoji: string) {
    if (moment.myEmoji === emoji) handleRemoveReaction(moment.id);
    else handleAddReaction(moment.id, emoji);
    setEmojiModalMoment(null);
  }

  return (
    <Wrapper>
      {moments.map((moment) => (
        <Moment
          key={moment.id}
          moment={moment}
          onDetail={setDetailModalMoment}
          onAddReaction={(emoji) => handleAddReaction(moment.id, emoji)}
          onRemoveReaction={() => handleRemoveReaction(moment.id)}
          my={moment.id === my}
        />
      ))}

      <Modals
        detailModalMoment={detailModalMoment}
        setDetailModalMoment={setDetailModalMoment}
        emojiModalMoment={emojiModalMoment}
        setEmojiModalMoment={setEmojiModalMoment}
        needLoginModalOpen={needLoginModalOpen}
        setNeedLoginModalOpen={setNeedLoginModalOpen}
        handleSelectEmoji={handleSelectEmoji}
      />
    </Wrapper>
  );
}
