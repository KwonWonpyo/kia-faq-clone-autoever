interface ErrorDialogProps {
  onClose: () => void;
}

export default function ErrorDialog({ onClose }: ErrorDialogProps) {
  return (
    <div className="dialog-wrapper dialog-error" id="error_faq">
      <div className="dialog-body" style={{ marginTop: '35px' }}>
        <p className="message">검색어는 2글자 이상 입력해주세요.</p>
        <div className="button-group">
          <button type="button" className="btn-xlg btn-tertiary" onClick={onClose}>확인</button>
        </div>
      </div>
    </div>
  );
};
