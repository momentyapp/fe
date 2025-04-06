import { useTheme } from "styled-components";
import { motion } from "motion/react";
import { MdAdd } from "react-icons/md";

import Emoji from "~/components/common/Emoji";
import CircularProgress from "~/components/common/CircularProgress";

import * as S from "./GeneratedTopic.style";

interface GeneratedTopicProps {
  topic: string;
  onClick: () => void;
  loading?: boolean;
}

export default function GeneratedTopic({
  topic,
  onClick,
  loading = false,
}: GeneratedTopicProps) {
  const theme = useTheme();

  return (
    <S.MotionWrapper
      initial={{ width: 0, marginRight: 0 }}
      animate={{ width: "auto", marginRight: "10px" }}
      exit={{ width: 0, marginRight: 0 }}
      transition={{
        type: "spring",
        duration: 0.7,
      }}
      layout
      layoutId={topic}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
      >
        <S.TopicButton
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
          <S.TopicName color={theme.grey1}>
            <Emoji>✨</Emoji>
            {topic}
          </S.TopicName>
        </S.TopicButton>
      </motion.div>
    </S.MotionWrapper>
  );
}
