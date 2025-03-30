import { AnimatePresence, motion } from "motion/react";

interface SlideProps extends React.ComponentProps<typeof motion.div> {
  visible: boolean;
  delay?: number;
}

export default function Slide({ visible, delay = 0, ...props }: SlideProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3, delay: delay * 0.001 }}
          {...props}
        />
      )}
    </AnimatePresence>
  );
}
