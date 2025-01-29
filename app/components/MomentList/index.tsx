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
  postedMoment?: MomentType;
  moments: MomentType[];
  setMoments: React.Dispatch<React.SetStateAction<MomentType[]>>;
  onLoadMore: () => Promise<void>;
  my?: number;
}

export default function MomentList({
  postedMoment,
  moments,
  setMoments,
  onLoadMore,
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

  // 스크롤 이벤트 핸들러
  async function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    if (
      event.currentTarget.scrollHeight - event.currentTarget.scrollTop <
      event.currentTarget.clientHeight + 100
    ) {
      await onLoadMore();
    }
  }

  return (
    <Wrapper onScroll={handleScroll}>
      {postedMoment !== undefined && (
        <Moment
          moment={postedMoment}
          onDetail={setDetailModalMoment}
          onAddReaction={(emoji) => handleAddReaction(postedMoment.id, emoji)}
          onRemoveReaction={() => handleRemoveReaction(postedMoment.id)}
          onEmojiModalOpen={() => setEmojiModalMoment(postedMoment)}
          my
        />
      )}

      {moments.map((moment) => (
        <Moment
          key={moment.id}
          moment={moment}
          onDetail={setDetailModalMoment}
          onAddReaction={(emoji) => handleAddReaction(moment.id, emoji)}
          onRemoveReaction={() => handleRemoveReaction(moment.id)}
          onEmojiModalOpen={() => setEmojiModalMoment(moment)}
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
