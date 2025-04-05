import { useTheme } from "styled-components";
import { MdCheck, MdSearch } from "react-icons/md";
import ReactModal from "react-modal";

import Slide from "~/components/common/Slide";

import useTopicSearch from "~/hooks/useTopicSearch";
import useTrendingTopics from "~/hooks/useTrendingTopics";

import TopicContainer from "./TopicContainer";

import * as S from "./index.style";

import type { Topic } from "common";

interface TopicModalProps extends Omit<ReactModal.Props, "style"> {
  addedTopics: Topic[];
  setAddedTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
}

export default function TopicModal({
  addedTopics,
  setAddedTopics,
  onRequestClose,
  isOpen,
  ...props
}: TopicModalProps) {
  const theme = useTheme();

  const {
    searchValue,
    handleChangeSearchValue,
    topics,
    loading,
    handleCreate,
  } = useTopicSearch(addedTopics, setAddedTopics);

  const trendingTopics = useTrendingTopics();

  return (
    <ReactModal
      closeTimeoutMS={300}
      onRequestClose={onRequestClose}
      isOpen={isOpen}
      {...props}
    >
      <S.ContentContainer>
        <Slide visible={isOpen} delay={50}>
          <S.SearchInput
            placeholder="검색어를 입력하세요."
            value={searchValue}
            onChange={handleChangeSearchValue}
            icon={(focus) => (
              <MdSearch size="24" color={focus ? theme?.grey1 : theme?.grey2} />
            )}
          />
          <TopicContainer
            topics={
              trendingTopics !== undefined && searchValue.length === 0
                ? trendingTopics
                : topics
            }
            addedTopics={addedTopics}
            setAddedTopics={setAddedTopics}
            searchValue={searchValue}
            isLoading={loading}
            onCreate={handleCreate}
          />
        </Slide>

        {/* 하단 버튼 */}
        <Slide visible={isOpen} delay={100}>
          <S.FullWidthButton
            backgroundColor={theme.primary3}
            icon={<MdCheck size="24" color={theme.bg1} />}
            onClick={onRequestClose}
          >
            <S.ButtonText color={theme.bg1}>완료</S.ButtonText>
          </S.FullWidthButton>
        </Slide>
      </S.ContentContainer>
    </ReactModal>
  );
}
