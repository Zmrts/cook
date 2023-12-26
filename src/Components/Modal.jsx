function Modal(props) {
  const { text, handleClick } = props;
  return (
   
      <div
        style={{ display: "flex", zIndex: "10", position: "fixed" }}
        className="overlay"
      >
        <div className="modal">
          <p>{text && text}</p>
          <button onClick={handleClick}>ОK</button>
        </div>
       
      </div>
      
   
  );
}

export { Modal };
