import { useTheme } from "styled-components";
import { MdClose } from "react-icons/md";
import { motion } from "motion/react";

import * as S from "./Topic.Style";

interface TopicProps {
  topic: string;
  onClick: () => void;
}

export default function Topic({ topic, onClick }: TopicProps) {
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
          backgroundColor={theme.bg3}
          icon={<MdClose size="20" color={theme.grey1} />}
          iconPosition="right"
          onClick={onClick}
        >
          <S.TopicName color={theme.grey1}>{topic}</S.TopicName>
        </S.TopicButton>
      </motion.div>
    </S.MotionWrapper>
  );
}
