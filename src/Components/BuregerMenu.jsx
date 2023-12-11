import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
function BuregerMenu() {
  const [isOpen, setIsOpen] = useState();
  const [startTouchX, setStartTouchX] = useState(null);
  const [currentX, setCurrentX] = useState(null);

  const pageWidth = window.innerWidth;
  console.log(pageWidth);

  const burgerListRef = useRef(null);
  const onTouch = (evt) => {
    setStartTouchX(evt.touches[0].pageX);
  }

  const onMove = (evt) => {
    if (startTouchX !== 0) {
        const diffX = evt.touches[0].pageX - startTouchX;
        setCurrentX(diffX);
        console.log(diffX);
    }
  }

  const openStyles = {
    opacity: currentX ? (1 - (currentX/pageWidth) * -1.2)  : 1,
    left: (currentX && currentX < 0) ? currentX : 0,

  };

  const closeStyles = {
    opacity: 0,
    left: "-100%",
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="burger">
      <div
        onClick={handleClick}
        style={{ zIndex: "1000" }}
        className={`burger_icon ${isOpen && "opened"}`}
      >
        <div className="burger_icon_item"></div>
        <div className="burger_icon_item"></div>
        <div className="burger_icon_item"></div>
      </div>
      <ul
      onTouchStart={onTouch}
      onTouchMove={onMove}
        style={isOpen ? openStyles : closeStyles}
        ref={burgerListRef}
        className="burger_list"
      > 
        <NavLink onClick={() => setIsOpen(false)} to="/">
          Главная
        </NavLink>
        <NavLink onClick={() => setIsOpen(false)} to="/settings">
          Настройки
        </NavLink>
      </ul>
    </div>
  );
}

export { BuregerMenu };
