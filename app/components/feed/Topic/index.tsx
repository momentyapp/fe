import { useTheme } from "styled-components";
import { MdClose } from "react-icons/md";
import { motion } from "motion/react";

import * as S from "./index.style";

interface TopicProps {
  topic: string;
  onClick: () => void;
}

export default function Topic({ topic, onClick }: TopicProps) {
  const theme = useTheme();

  return (
    <S.MotionWrapper
      initial={{ width: 0, marginRight: 0 }}
      animate={{ width: "auto", marginRight: "7px" }}
      exit={{ width: 0, marginRight: 0 }}
      transition={{
        type: "spring",
        duration: 0.7,
      }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
      >
        <S.TopicButton
          backgroundColor={theme.bg2}
          icon={<MdClose size="14" color={theme.grey2} />}
          iconPosition="right"
          onClick={onClick}
        >
          <S.TopicName color={theme.grey1}>{topic}</S.TopicName>
        </S.TopicButton>
      </motion.div>
    </S.MotionWrapper>
  );
}
