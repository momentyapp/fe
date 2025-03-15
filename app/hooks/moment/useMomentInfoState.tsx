import { useState } from "react";

import type { Moment } from "common";

export default function useMomentInfoState() {
  const [momentInfoModalOpen, setMomentInfoModalOpen] = useState(false);
  const [momentInfo, setMomentInfo] = useState<Moment | null>(null);

  function handleMomentInfoOpen(moment: Moment) {
    setMomentInfo(moment);
    setMomentInfoModalOpen(true);
  }

  function handleMomentInfoClose() {
    setMomentInfoModalOpen(false);
  }

  return {
    momentInfoModalOpen,
    setMomentInfoModalOpen,
    momentInfo,
    setMomentInfo,
    handleMomentInfoOpen,
    handleMomentInfoClose,
  };
}
