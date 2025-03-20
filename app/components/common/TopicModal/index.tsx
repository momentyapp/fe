import { useContext } from "react";
import { styled, ThemeContext } from "styled-components";
import { MdCheck } from "react-icons/md";
import ReactModal from "react-modal";

import Button from "~/components/common/Button";
import Typography from "~/components/common/Typography";
import Slide from "~/components/common/Slide";

import useTopicSearch from "~/hooks/useTopicSearch";
import useTrendingTopics from "~/hooks/useTrendingTopics";

import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

import type { Topic } from "common";

const Content = styled.div`
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

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
  const theme = useContext(ThemeContext);

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
      <Content>
        <Slide
          visible={isOpen}
          delay={50}
          timingFunction="cubic-bezier(0.17,0.84,0.44,1)"
        >
          <SearchInput value={searchValue} onChange={handleChangeSearchValue} />
          <SearchResults
            topics={
              trendingTopics !== undefined && searchValue.length === 0
                ? trendingTopics
                : topics
            }
            addedTopics={addedTopics}
            setAddedTopics={setAddedTopics}
            searchValue={searchValue}
            loading={loading}
            onCreate={handleCreate}
          />
        </Slide>

        {/* 하단 버튼 */}
        <Slide
          visible={isOpen}
          delay={100}
          timingFunction="cubic-bezier(0.17,0.84,0.44,1)"
        >
          <StyledButton
            backgroundColor={theme?.primary3}
            icon={<MdCheck size="24" color={theme?.bg1} />}
            onClick={onRequestClose}
          >
            <Typography color={theme?.bg1} size="18px">
              완료
            </Typography>
          </StyledButton>
        </Slide>
      </Content>
    </ReactModal>
  );
}
