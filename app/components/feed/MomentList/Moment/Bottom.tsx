import React, { createRef, useContext, useMemo } from "react";
import { Transition, TransitionGroup } from "react-transition-group";
import { styled, ThemeContext } from "styled-components";
import { MdAddReaction } from "react-icons/md";

import Pressable from "~/components/common/Pressable";

import Reaction from "./Reaction";

import type { Moment } from "common";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  overflow-x: auto;
`;

const ReactionContainer = styled.div`
  display: flex;
  padding: 0px 20px;
  gap: 10px;
`;

const InsideReactionList = styled(TransitionGroup)`
  display: flex;
`;

const AddReaction = styled(Pressable)<{ $myEmoji?: boolean }>`
  display: flex;
  padding: 7px 12px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  box-shadow: 0 0 0 ${(props) => (props.$myEmoji ? "1px" : "0px")}
    ${(props) => props.theme?.primary4} inset;
  border-radius: 10px;
`;

interface BottomProps {
  moment: Moment;
  onAddReaction: (emoji: string) => void;
  onRemoveReaction: () => void;
  onEmojiModalOpen: () => void;
  ref?: React.Ref<HTMLDivElement>;
}

export default function Bottom({
  moment,
  onAddReaction,
  onRemoveReaction,
  onEmojiModalOpen,
  ref,
}: BottomProps) {
  const theme = useContext(ThemeContext);

  function handleReactionClick(emoji: string) {
    if (moment.myEmoji === emoji) onRemoveReaction();
    else onAddReaction(emoji);
  }

  // 반응 개수만큼 ref 생성
  const reactionRefs = useMemo(
    () =>
      Object.keys(moment.reactions).reduce<
        Record<string, React.Ref<HTMLDivElement>>
      >((acc, emoji) => ({ ...acc, [emoji]: createRef<HTMLDivElement>() }), {}),
    [moment.reactions]
  );

  return (
    <>
      <Wrapper ref={ref}>
        <ReactionContainer>
          <AddReaction backgroundColor={theme?.bg1} onClick={onEmojiModalOpen}>
            <MdAddReaction size="20px" color={theme?.grey1} />
          </AddReaction>

          <InsideReactionList>
            {Object.keys(moment.reactions).map((emoji, index) => (
              <Transition
                key={emoji}
                timeout={500}
                nodeRef={reactionRefs[emoji]}
              >
                {(state) => (
                  <Reaction
                    emoji={emoji}
                    count={moment.reactions[emoji]}
                    myEmoji={moment.myEmoji === emoji}
                    onClick={() => handleReactionClick(emoji)}
                    ref={reactionRefs[emoji]}
                    transitionStatus={state}
                  />
                )}
              </Transition>
            ))}
          </InsideReactionList>
        </ReactionContainer>
      </Wrapper>
    </>
  );
}
