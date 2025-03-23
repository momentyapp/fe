import { createRef, useContext, useEffect, useState, type Ref } from "react";
import { styled, ThemeContext } from "styled-components";
import { Transition, TransitionGroup } from "react-transition-group";

import { MdTune } from "react-icons/md";

import Pressable from "~/components/common/Pressable";
import TopicModal from "~/components/common/TopicModal";

import TopicToggle from "./TopicToggle";

import type { Topic } from "common";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  align-items: center;
  box-sizing: border-box;
  overflow-x: scroll;
  position: sticky;
  top: 60px;
  background-color: ${(props) => props.theme?.bg1};
  z-index: 1;
`;

const InsideTopicToggleList = styled(TransitionGroup)`
  display: flex;
  align-items: center;
  box-sizing: border-box;

  > * {
    flex-shrink: 0;
  }
`;

const AddTopic = styled(Pressable)`
  display: flex;
  height: 36px;
  padding: 0 15px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-right: 10px;
`;

interface TopicWithRef extends Topic {
  ref: Ref<HTMLButtonElement>;
}

interface TopicFilterProps {
  topics: Topic[];
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
}

export default function TopicToggleList({
  topics,
  setTopics,
}: TopicFilterProps) {
  const theme = useContext(ThemeContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [topicsWithRefs, setTopicsWithRefs] = useState<TopicWithRef[]>([]);

  // topics 변경 감지
  useEffect(() => {
    setTopicsWithRefs(
      topics.map((topic) => ({
        ...topic,
        ref: createRef<HTMLButtonElement>(),
      }))
    );
  }, [topics]);

  // 주제 제거
  function removeTopic(topicId: number) {
    setTopics((prevTopics) =>
      prevTopics.filter((topic) => topic.id !== topicId)
    );
  }

  return (
    <Wrapper>
      <AddTopic backgroundColor={theme?.bg2} onClick={() => setModalOpen(true)}>
        <MdTune size="20" color={theme?.grey1} />
      </AddTopic>
      <InsideTopicToggleList>
        {topicsWithRefs.map((topic) => (
          <Transition key={topic.id} timeout={500} nodeRef={topic.ref}>
            {(state) => (
              <TopicToggle
                ref={topic.ref}
                topic={topic.name}
                onClick={() => removeTopic(topic.id)}
                transitionStatus={state}
                key={topic.id}
              />
            )}
          </Transition>
        ))}
      </InsideTopicToggleList>

      {/* 주제 모달 */}
      <TopicModal
        addedTopics={topics}
        setAddedTopics={setTopics}
        onRequestClose={() => setModalOpen(false)}
        isOpen={modalOpen}
      />
    </Wrapper>
  );
}
