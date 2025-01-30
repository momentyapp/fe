import { useState, useContext, type Ref, createRef, useEffect } from "react";
import { styled } from "styled-components";
import { Transition, TransitionGroup } from "react-transition-group";

import API from "~/apis";
import SessionContext from "~/contexts/session";

import Moment from "./Moment";
import Modals from "./Modals";

import type { Moment as MomentType } from "common";

const Wrapper = styled(TransitionGroup)`
  display: flex;
  padding: 10px 10px 100px 10px;
  flex-direction: column;
`;

interface MomentWithRef extends MomentType {
  ref: Ref<HTMLDivElement>;
}

interface MomentListProps {
  moments: MomentType[];
  setMoments: React.Dispatch<React.SetStateAction<MomentType[]>>;
  onLoadMore: () => Promise<void>;
  my?: number;
}

export default function MomentList({
  moments,
  setMoments,
  onLoadMore,
  my,
}: MomentListProps) {
  const session = useContext(SessionContext);

  const [momentsWithRefs, setMomentsWithRefs] = useState<MomentWithRef[]>([]);

  const [detailModalMoment, setDetailModalMoment] = useState<MomentType | null>(
    null
  );
  const [emojiModalMoment, setEmojiModalMoment] = useState<MomentType | null>(
    null
  );

  const [needLoginModalOpen, setNeedLoginModalOpen] = useState(false);

  // moments 변경 감지
  useEffect(() => {
    setMomentsWithRefs(
      moments.map((moment) => ({
        ...moment,
        ref: createRef<HTMLDivElement>(),
      }))
    );
  }, [moments]);

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
      {momentsWithRefs.map((moment) => (
        <Transition key={moment.id} timeout={500} nodeRef={moment.ref}>
          {(state) => (
            <Moment
              key={moment.id}
              moment={moment}
              ref={moment.ref}
              onDetail={setDetailModalMoment}
              onAddReaction={(emoji) => handleAddReaction(moment.id, emoji)}
              onRemoveReaction={() => handleRemoveReaction(moment.id)}
              onEmojiModalOpen={() => setEmojiModalMoment(moment)}
              my={moment.id === my}
              transitionStatus={state}
            />
          )}
        </Transition>
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
