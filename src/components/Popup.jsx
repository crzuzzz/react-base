import "./Popup.css";

export default function Popup({ isOpen, onClose, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="popup-close" onClick={onClose}>
          ✕
        </button>

        <div className="popup-icon">✓</div>

        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}