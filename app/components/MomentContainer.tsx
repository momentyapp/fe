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
    const moment = moments.find((moment) => moment.id === momentId);
    if (moment === undefined) return;

    const myEmoji = moment.myEmoji;
    setMoments((prevMoments) =>
      prevMoments.map((moment) => {
        if (moment.id === momentId) {
          return {
            ...moment,
            reactions: {
              ...moment.reactions,
              ...(myEmoji !== undefined
                ? { [myEmoji]: moment.reactions[myEmoji] - 1 }
                : {}),
              [emoji]: (moment.reactions[emoji] ?? 0) + 1,
            },
            myEmoji: emoji,
          };
        }
        return moment;
      })
    );
  }

  // 반응 제거 함수
  function handleRemoveReaction(momentId: number) {
    const moment = moments.find((moment) => moment.id === momentId);
    if (moment === undefined) return;

    const myEmoji = moment.myEmoji;
    setMoments((prevMoments) =>
      prevMoments.map((moment) => {
        if (moment.id === momentId) {
          return {
            ...moment,
            reactions: {
              ...moment.reactions,
              ...(myEmoji !== undefined
                ? { [myEmoji]: moment.reactions[myEmoji] - 1 }
                : {}),
            },
            myEmoji: undefined,
          };
        }
        return moment;
      })
    );
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
