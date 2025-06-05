import { useRef, type TouchEvent } from "react";
import { NavLink } from "react-router-dom";
import { useSidebarStore } from "../stores/sidebarStore";

const Sidebar: React.FC = () => {
  const popupOpen = useSidebarStore((state) => state.popupOpen);
  const popupTranslateY = useSidebarStore((state) => state.popupTranslateY);
  const isClosing = useSidebarStore((state) => state.isClosing);
  const hasRendered = useSidebarStore((state) => state.hasRendered);

  const setPopupOpen = useSidebarStore((state) => state.setPopupOpen);
  const setPopupTranslateY = useSidebarStore(
    (state) => state.setPopupTranslateY,
  );
  const setIsClosing = useSidebarStore((state) => state.setIsClosing);
  const setHasRendered = useSidebarStore((state) => state.setHasRendered);

  const startYRef = useRef<number | null>(null);

  const openPopup = (section: "overview" | "account") => {
    setPopupOpen(section);
    setPopupTranslateY(0);
    setIsClosing(false);
    setHasRendered(false);
    setTimeout(() => {
      setHasRendered(true);
    }, 10);
  };

  const closePopup = () => {
    setPopupTranslateY(0);
    setIsClosing(true);
    setTimeout(() => {
      setPopupOpen(null);
      setIsClosing(false);
      setHasRendered(false);
    }, 350);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    startYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (startYRef.current === null) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - startYRef.current;
    if (diff < 0) {
      const translateY = Math.max(diff / 3, 0);
      setPopupTranslateY(translateY);
    } else {
      setPopupTranslateY(diff);
    }
  };

  const handleTouchEnd = () => {
    if (startYRef.current === null) return;
    if (popupTranslateY > 150) {
      closePopup();
    } else {
      setPopupTranslateY(0);
    }
    startYRef.current = null;
  };

  return (
    <>
      <nav className="sidebar">
        <ul className="sidebar-list">
          <li className="section-li">
            <button
              type="button"
              onClick={() => openPopup("overview")}
              className="section-title"
            >
              Overview
            </button>
            <ul className="sidebar-list">
              <li className="sidebar-li">
                <NavLink to="/">🏠 Home</NavLink>
              </li>
              <li className="sidebar-li">
                <NavLink to="/category">📚 Category</NavLink>
              </li>
            </ul>
          </li>
          <li className="section-li">
            <button
              type="button"
              onClick={() => openPopup("account")}
              className="section-title"
            >
              Account
            </button>
            <ul className="sidebar-list">
              <li className="sidebar-li">
                <NavLink to="/settings">⚙️ Settings</NavLink>
              </li>
            </ul>
          </li>
        </ul>
        <div className="user">
          <span className="circle" />
          <span>User</span>
        </div>
      </nav>

      {popupOpen && (
        <>
          <div className="drawer-backdrop" onClick={closePopup} />
          <div
            className={`popup-drawer ${
              popupTranslateY !== 0
                ? "dragging"
                : isClosing
                  ? "closing"
                  : hasRendered
                    ? "open"
                    : ""
            }`}
            style={
              popupTranslateY !== 0 && !isClosing
                ? {
                    transform: `translateY(${popupTranslateY}px)`,
                  }
                : undefined
            }
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="drawer-handle" />
            <button
              type="button"
              onClick={closePopup}
              className="close-btn"
              aria-label="Close menu"
            >
              ×
            </button>
            <ul className="drawer-list">
              {popupOpen === "overview" ? (
                <>
                  <li className="sidebar-li">
                    🏠{" "}
                    <NavLink to="/" onClick={closePopup}>
                      Home
                    </NavLink>
                  </li>
                  <li className="sidebar-li">
                    📚{" "}
                    <NavLink to="/category" onClick={closePopup}>
                      Category
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="sidebar-li">
                  ⚙️{" "}
                  <NavLink to="/settings" onClick={closePopup}>
                    Settings
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
