import { type Ref } from "react";
import { styled, useTheme } from "styled-components";
import { motion } from "motion/react";

import Button from "~/components/common/Button";
import Typography from "~/components/common/Typography";
import Emoji from "~/components/common/Emoji";
import CircularProgress from "~/components/common/CircularProgress";

import { MdAdd } from "react-icons/md";

const TopicButton = styled(Button)`
  height: 36px;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
  border-radius: 10px;
  box-shadow: 0 0 0 1px ${(props) => props.theme.grey1} inset;
`;

const TopicName = styled(Typography)`
  word-break: break-all;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 5px;
`;

interface GeneratedTopicProps {
  topic: string;
  onClick: () => void;
  loading?: boolean;
  ref?: Ref<HTMLDivElement>;
}

export default function GeneratedTopic({
  topic,
  onClick,
  loading = false,
  ref,
}: GeneratedTopicProps) {
  const theme = useTheme();

  return (
    <motion.div
      ref={ref}
      initial={{ width: 0, marginRight: 0 }}
      animate={{ width: "auto", marginRight: "10px" }}
      exit={{ width: 0, marginRight: 0 }}
      transition={{
        type: "spring",
        duration: 0.7,
      }}
      style={{
        borderRadius: "10px",
        display: "flex",
        justifyContent: "flex-start",
        flexShrink: 0,
      }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
      >
        <TopicButton
          backgroundColor={loading ? theme.bg3 : theme.bg1}
          icon={
            loading ? (
              <CircularProgress size={20} color={theme.grey1} />
            ) : (
              <MdAdd size="20" color={theme.grey1} />
            )
          }
          iconPosition="right"
          onClick={onClick}
          disabled={loading}
        >
          <TopicName color={theme.grey1} size="16px">
            <Emoji>✨</Emoji>
            {topic}
          </TopicName>
        </TopicButton>
      </motion.div>
    </motion.div>
  );
}
