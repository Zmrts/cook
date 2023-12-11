import { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    const burgerList = burgerListRef.current;
    if (startTouchX !== null) {
        const diffX =  currentX - startTouchX;
        requestAnimationFrame(() => {
            burgerList.style.transform = diffX < 0 ? `translateX(${diffX}px)` : 0;
            burgerList.style.opacity = 1 + (diffX / pageWidth);
        })
       
    }
  }, [currentX])

  const onMove = (evt) => {
    if (startTouchX !== 0) {
        
        const diffX = evt.touches[0].pageX - startTouchX;
        setCurrentX(diffX);
        console.log(diffX);
    }
  }

  const openStyles = {
    opacity: 1,
    left: 0,

  };

  const closeStyles = {
    opacity: 0,
    left: "-100%",
  };

  const handleClick = () => {
    const body = document.querySelector('body');
    if (!isOpen) {
        body.style.overflowY = 'hidden';
        setIsOpen(true);
    } else {
        body.style.overflowY = 'visible';
        setIsOpen(false);
    }
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
      onTouchMove={(evt) => setCurrentX(evt.touches[0].pageX)}
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
