import "../sass/key.scss";

const Key = ({ children, id, onClick }) => {
  return (
    <button onClick={onClick} value={children} className={`key ${id}`} id={id}>
      {children}
    </button>
  );
};

export default Key;
