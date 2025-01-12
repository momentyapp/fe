import { styled } from "styled-components";

import Moment from "~/components/Moment";

import type { Moment as MomentType } from "common";

const Wrapper = styled.div`
  display: flex;
  padding: 10px 10px 100px 10px;
  flex-direction: column;
  gap: 10px;
`;

interface MomentContainerProps {
  moments: MomentType[];
  setMoments: React.Dispatch<React.SetStateAction<MomentType[]>>;
}

export default function MomentContainer({
  moments,
  setMoments,
}: MomentContainerProps) {
  // 반응 추가 함수
  function handleAddReaction(momentId: number, emoji: string) {
    setMoments((prevMoments) => {
      const newMoments = [...prevMoments];

      const moment = newMoments.find((moment) => moment.id === momentId);
      if (moment === undefined) return newMoments;
      const { reactions, myEmoji } = moment;

      if (myEmoji !== undefined) {
        // 내가 반응한 이모지 개수가 1개일 경우
        if (myEmoji !== undefined && reactions[myEmoji] === 1)
          delete reactions[myEmoji];
        else reactions[myEmoji] = reactions[myEmoji] - 1;
      }

      // 새 반응 추가
      reactions[emoji] = (reactions[emoji] ?? 0) + 1;
      moment.myEmoji = emoji;

      return newMoments;
    });
  }

  // 반응 제거 함수
  function handleRemoveReaction(momentId: number) {
    setMoments((prevMoments) => {
      const newMoments = [...prevMoments];

      const moment = newMoments.find((moment) => moment.id === momentId);
      if (moment === undefined) return newMoments;
      const { reactions, myEmoji } = moment;

      if (myEmoji === undefined) return newMoments;

      // 내가 반응한 이모지 개수가 1개일 경우
      if (reactions[myEmoji] === 1) delete reactions[myEmoji];
      else reactions[myEmoji] = reactions[myEmoji] - 1;

      delete moment.myEmoji;

      return newMoments;
    });
  }

  return (
    <Wrapper>
      {moments.map((moment) => (
        <Moment
          key={moment.id}
          moment={moment}
          onAddReaction={(emoji) => handleAddReaction(moment.id, emoji)}
          onRemoveReaction={() => handleRemoveReaction(moment.id)}
        />
      ))}
    </Wrapper>
  );
}
