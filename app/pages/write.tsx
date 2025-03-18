import Top from "~/components/write/Top";
import Body from "~/components/write/Body";
import Bottom from "~/components/write/Bottom";
import ConfirmModal from "~/components/write/ConfirmModal";
import useWriteState from "~/hooks/useWriteState";
import ErrorModal from "~/components/common/ErrorModal";

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
    errorModalOpen,
    setErrorModalOpen,
    errorMessage,
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

      {/* 오류 모달 */}
      <ErrorModal
        message={errorMessage}
        isOpen={errorModalOpen}
        onRequestClose={() => setErrorModalOpen(false)}
        onRetry={handleConfirmPost}
      />
    </>
  );
}
