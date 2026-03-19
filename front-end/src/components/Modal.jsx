export default function Modal({ message, onConfirm, onCancel }) {
  
  return (
    <div className="modal">
      <div className="contenitore">
        <p>{message}</p>
        <div>
          <button className="btn-conferma" onClick={onConfirm}>
            Conferma
          </button>
          <button className="btn-annulla" onClick={onCancel}>
            Annulla
          </button>
        </div>
      </div>
    </div>
  );
}
