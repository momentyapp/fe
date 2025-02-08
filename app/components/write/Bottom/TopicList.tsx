import { useState, useContext, type Ref, createRef, useEffect } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdAdd } from "react-icons/md";
import { Transition, TransitionGroup } from "react-transition-group";

import Button from "~/components/common/Button";
import Typography from "~/components/common/Typography";
import TopicModal from "~/components/common/TopicModal";

import Topic from "./Topic";
import KnownTopic from "./KnownTopic";
import UnknownTopic from "./UnknownTopic";

import type { Topic as TopicType } from "common";

const Wrapper = styled(TransitionGroup)`
  display: flex;
  flex-direction: row;
  padding: 3px 10px;
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

interface TopicListProps {
  topics: TopicType[];
  setTopics: React.Dispatch<React.SetStateAction<TopicType[]>>;
  generatedKnownTopics: TopicType[];
  setGeneratedKnownTopics: React.Dispatch<React.SetStateAction<TopicType[]>>;
  generatedUnknownTopics: string[];
  setGeneratedUnknownTopics: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function TopicList({
  topics,
  setTopics,
  generatedKnownTopics,
  setGeneratedKnownTopics,
  generatedUnknownTopics,
  setGeneratedUnknownTopics,
}: TopicListProps) {
  const theme = useContext(ThemeContext);

  const [modalOpen, setModalOpen] = useState(false);

  const topicsWithRefs = topics.map((topic) => ({
    ...topic,
    ref: createRef<HTMLDivElement>(),
  }));
  const knownTopicsWithRefs = generatedKnownTopics.map((topic) => ({
    ...topic,
    ref: createRef<HTMLDivElement>(),
  }));
  const unknownTopicsWithRefs = generatedUnknownTopics.map((topic) => ({
    name: topic,
    ref: createRef<HTMLDivElement>(),
  }));

  function handleRemoveTopic(topic: TopicType) {
    setTopics((prevTopics) => prevTopics.filter((t) => t.id !== topic.id));
  }

  function handleAddTopic(topic: TopicType) {
    setTopics((prevTopics) => [...prevTopics, topic]);
    setGeneratedKnownTopics((prevTopics) =>
      prevTopics.filter((t) => t.id !== topic.id)
    );
  }

  function handleCreateAndAddTopic(topicName: string) {
    // TODO: Implement this function
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

      {topicsWithRefs.map((topic) => (
        <Transition key={topic.id} timeout={500} nodeRef={topic.ref}>
          {(state) => (
            <Topic
              ref={topic.ref}
              topic={topic.name}
              onClick={() => handleRemoveTopic(topic)}
              transitionStatus={state}
              key={topic.id}
            />
          )}
        </Transition>
      ))}

      {knownTopicsWithRefs.map((topic) => (
        <Transition key={topic.id} timeout={500} nodeRef={topic.ref}>
          {(state) => (
            <KnownTopic
              ref={topic.ref}
              topic={topic.name}
              onClick={() => handleAddTopic(topic)}
              transitionStatus={state}
              key={topic.id}
            />
          )}
        </Transition>
      ))}

      {unknownTopicsWithRefs.map((topic) => (
        <Transition key={topic.name} timeout={500} nodeRef={topic.ref}>
          {(state) => (
            <UnknownTopic
              ref={topic.ref}
              topic={topic.name}
              onClick={() => handleCreateAndAddTopic(topic.name)}
              transitionStatus={state}
              key={topic.name}
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
