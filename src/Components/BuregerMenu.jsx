import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
function BuregerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [startTouchX, setStartTouchX] = useState(null);
  const [currentX, setCurrentX] = useState(null);

  const burgerListRef = useRef(null);

  const pageWidth = window.innerWidth;

  const openStyles = {
    opacity: 1,
    transform: "translateX(0)",
  };

  const closeStyles = {
    opacity: 0,
    transform: "translateX(-100%)",
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const onTouch = (evt) => {
    setStartTouchX(evt.touches[0].pageX);
  };
  const handleClickToLink = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 50);
  };

  const handleOnTouchEnd = () => {
    if (startTouchX !== null) {
      const burgerList = burgerListRef.current;
      setTimeout(() => {
        const diffX = (currentX - startTouchX) * -1 > pageWidth / 3;
        if (diffX) {
          setIsOpen(false);
        } else {
          burgerList.style.transform = "translateX(0)";
          burgerList.style.opacity = "1";
        }
      }, 20);
    }
  };

  useEffect(() => {
    const burgerList = burgerListRef.current;
     const diffX = currentX - startTouchX;
    if (startTouchX !== null) {
     
     setTimeout(() => {
         requestAnimationFrame(() => {
           burgerList.style.transform =
             diffX < 0 ? `translateX(${diffX * 1.3}px)` : 0;
           burgerList.style.opacity = 1 + diffX / pageWidth;
         });
     }, 10);
    }
  }, [currentX]);

  useEffect(() => {
    const body = document.querySelector("body");
    if (isOpen) {
      body.classList.add('overflow');
    } else {
        body.classList.remove('overflow');
    }
  }, [isOpen]);

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
        onTouchEnd={handleOnTouchEnd}
        style={isOpen ? openStyles : closeStyles}
        ref={burgerListRef}
        className="burger_list"
      >
        <NavLink onClick={handleClickToLink} to="/">
          Главная
        </NavLink>
        <NavLink onClick={handleClickToLink} to="/settings">
          Настройки
        </NavLink>
      </ul>
    </div>
  );
}

export { BuregerMenu };
