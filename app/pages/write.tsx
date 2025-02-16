import Top from "~/components/write/Top";
import Body from "~/components/write/Body";
import Bottom from "~/components/write/Bottom";
import ConfirmModal from "~/components/write/ConfirmModal";
import useWriteState from "~/hooks/write/useWriteState";

export default function Write() {
  const {
    text,
    setText,
    topics,
    setTopics,
    generatedTopics,
    setGeneratedTopics,
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
      <Bottom
        topics={topics}
        setTopics={setTopics}
        generatedTopics={generatedTopics}
        setGeneratedTopics={setGeneratedTopics}
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
