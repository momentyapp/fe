import { useState, useContext, type Ref, createRef, useEffect } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdClose, MdAdd } from "react-icons/md";
import { Transition, TransitionGroup } from "react-transition-group";

import Button from "~/components/Button";
import Typography from "~/components/Typography";
import TopicModal from "~/components/TopicModal";

import Topic from "./Topic";

import type { Topic as TopicType } from "common";

const Wrapper = styled(TransitionGroup)`
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  width: 100%;
  overflow-x: auto;
  box-sizing: border-box;
`;

const StyledButton = styled(Button)`
  height: 36px;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 10px;
  flex-shrink: 0;
  margin-right: 10px;
`;

interface TopicWithRef extends TopicType {
  ref: Ref<HTMLDivElement>;
}

interface TopicsProps {
  topics: TopicType[];
  setTopics: React.Dispatch<React.SetStateAction<TopicType[]>>;
}

export default function Topics({ topics, setTopics }: TopicsProps) {
  const theme = useContext(ThemeContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [topicsWithRefs, setTopicsWithRefs] = useState<TopicWithRef[]>([]);

  // topics 변경 감지
  useEffect(() => {
    setTopicsWithRefs(
      topics.map((topic) => ({
        ...topic,
        ref: createRef<HTMLDivElement>(),
      }))
    );
  }, [topics]);

  function handleClick(topic: TopicType) {
    setTopics((prevTopics) => prevTopics.filter((t) => t.id !== topic.id));
  }

  return (
    <Wrapper>
      <StyledButton
        backgroundColor={theme?.primary3}
        icon={<MdAdd size="20" color={theme?.bg1} />}
        iconPosition="left"
        onClick={() => setModalOpen(true)}
      >
        <Typography color={theme?.bg1} size="16px">
          직접 추가
        </Typography>
      </StyledButton>

      {topicsWithRefs.map((topic, index) => (
        <Transition key={topic.id} timeout={500} nodeRef={topic.ref}>
          {(state) => (
            <Topic
              ref={topic.ref}
              topic={topic.name}
              onClick={() => handleClick(topic)}
              transitionStatus={state}
              key={topic.id}
            />
          )}
        </Transition>
      ))}

      <TopicModal
        addedTopics={topics}
        setAddedTopics={setTopics}
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      />
    </Wrapper>
  );
}
