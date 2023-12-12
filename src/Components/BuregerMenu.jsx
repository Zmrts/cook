import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
function BuregerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState();

  const {pathname} = useLocation();


  const burgerListRef = useRef(null);

  const pageWidth = window.innerWidth;

  const commonTransition = !isDragging
    ? "transform 0.2s ease"
    : "none";
  const openStyles = {
    transform: "translateX(0)",
    transition: commonTransition,
  };

  const closeStyles = {
    transform: "translateX(-100%)",
    transition: commonTransition,
  };

  const handleShowMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleTouchStart = (evt) => {
    setStartX(evt.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (evt) => {
    const currentX = evt.touches[0].clientX;
    const offsetX = (currentX - startX);
    setOffset(offsetX);

    requestAnimationFrame(() => {
      if (burgerListRef.current) {
        burgerListRef.current.style.transform = `translateX(${offsetX < 0 ? offsetX : 0}px)`;
      }
    });
  };

 

  const handleTouchEnd = (evt) => {
    console.log(offset);
    if (offset && (offset * - 1) > pageWidth / 3.2) {
      setTimeout(() => {
        setIsOpen(false);
      }, 20);
    } 
    if (offset && (offset * - 1) < pageWidth / 3.2) {
        console.log('На открытие')
      setTimeout(() => {
        burgerListRef.current.style.transform = "translateX(0)";
      }, 20);
    }
    setIsDragging(false);
  };

  const handleLinkClick = (evt) => {
    evt.stopPropagation();
    setIsOpen(false);
  }

  useEffect(() => {
    const body = document.querySelector("#root");
    if (isOpen) {
      body.classList.add("overflow");
    } else {
      body.classList.remove("overflow");
    }
  }, [isOpen]);

  return (
    <div className="burger">
      <div
        onClick={handleShowMenu}
        style={{ zIndex: "1000" }}
        className={`burger_icon ${isOpen && "opened"}`}
      >
        <div className="burger_icon_item"></div>
        <div className="burger_icon_item"></div>
        <div className="burger_icon_item"></div>
      </div>
      <ul
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={isOpen ? openStyles : closeStyles}
        ref={burgerListRef}
        className="burger_list"
      >
        <NavLink onClick={handleLinkClick} to="/">Главная</NavLink>
        <NavLink onClick={handleLinkClick} to="/settings">Настройки</NavLink>
      </ul>
    </div>
  );
}

export { BuregerMenu };
