import Top from "~/components/write/Top";
import Body from "~/components/write/Body";
import WriteFloatingBar from "~/components/write/Bottom";
import ConfirmModal from "~/components/write/ConfirmModal";
import useWriteState from "~/hooks/write/useWriteState";

export default function Write() {
  const {
    text,
    setText,
    topics,
    setTopics,
    generatedKnwonTopics,
    setGeneratedKnownTopics,
    generatedUnknownTopics,
    setGeneratedUnknownTopics,
    config,
    setConfig,
    photos,
    setPhotos,
    posting,
    confirmModalOpen,
    setConfirmModalOpen,
    handleConfirmPost,
  } = useWriteState();

  return (
    <>
      {/* 상단 바 */}
      <Top onPost={() => setConfirmModalOpen(true)} />

      {/* 본문 */}
      <Body
        value={text}
        onChange={setText}
        photos={photos}
        onPhotosChange={setPhotos}
      />

      {/* 하단 바 */}
      <WriteFloatingBar
        topics={topics}
        setTopics={setTopics}
        generatedKnownTopics={generatedKnwonTopics}
        generatedUnknownTopics={generatedUnknownTopics}
        setGeneratedKnownTopics={setGeneratedKnownTopics}
        setGeneratedUnknownTopics={setGeneratedUnknownTopics}
        config={config}
        setConfig={setConfig}
        onPost={() => setConfirmModalOpen(true)}
      />

      {/* 게시 확인 모달 */}
      <ConfirmModal
        expiresIn={config.expiresIn}
        anonymous={config.anonymous}
        isOpen={confirmModalOpen}
        onRequestClose={() => setConfirmModalOpen(false)}
        loading={posting}
        onPost={handleConfirmPost}
      />
    </>
  );
}
