import { createRef, useContext, useEffect, useState, type Ref } from "react";
import { styled, ThemeContext } from "styled-components";
import { Transition, TransitionGroup } from "react-transition-group";

import { MdTune } from "react-icons/md";

import SwitchableTopic from "~/components/SwitchableTopic";
import Pressable from "~/components/Pressable";
import TopicModal from "~/components/TopicModal";

import type { Topic } from "common";

const TopicContainer = styled(TransitionGroup)`
  display: flex;
  padding: 10px;
  align-items: center;
  box-sizing: border-box;
  overflow-x: scroll;
  position: sticky;
  top: 60px;
  background-color: ${(props) => props.theme?.bg1};
  z-index: 1;

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

export default function TopicFilter({ topics, setTopics }: TopicFilterProps) {
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

  // 주제 활성화를 전환하는 함수
  function switchTopic(id: number) {
    setTopics((prevTopics) => {
      return prevTopics.map((topic) => {
        if (topic.id === id) {
          return { ...topic, enabled: !topic.enabled };
        }
        return topic;
      });
    });
  }

  // 모달 열기 함수
  function handleOpenModal() {
    setModalOpen(true);
  }

  // 모달 닫기 함수
  function handleCloseModal() {
    setModalOpen(false);
  }

  return (
    <>
      <TopicContainer>
        <AddTopic backgroundColor={theme?.bg2} onClick={handleOpenModal}>
          <MdTune size="20" color={theme?.grey1} />
        </AddTopic>

        {topicsWithRefs.map((topic) => (
          <Transition key={topic.id} timeout={500} nodeRef={topic.ref}>
            {(state) => (
              <SwitchableTopic
                ref={topic.ref}
                topic={topic.name}
                enabled={topic.enabled}
                onClick={() => switchTopic(topic.id)}
                transitionStatus={state}
                key={topic.id}
              />
            )}
          </Transition>
        ))}
      </TopicContainer>

      {/* 주제 모달 */}
      <TopicModal
        addedTopics={topics}
        setAddedTopics={setTopics}
        onRequestClose={handleCloseModal}
        isOpen={modalOpen}
      />
    </>
  );
}
