export function Button({ onClick, isOpen }) {
  return (
    <button className="btn-toggle" onClick={() => onClick((open) => !open)}>
      {isOpen ? "–" : "+"}
    </button>
  );
}
