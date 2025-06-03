import { useState, useRef, type TouchEvent } from "react";
import { NavLink } from "react-router-dom";

interface LinkItem {
  icon: string;
  to: string;
  label: string;
}

const Sidebar: React.FC = () => {
  const [popupOpen, setPopupOpen] = useState<"overview" | "account" | null>(
    null,
  );
  const [popupTranslateY, setPopupTranslateY] = useState<number>(0);
  const startYRef = useRef<number | null>(null);

  const overviewLinks: LinkItem[] = [
    { icon: "🏠", to: "/", label: "Home" },
    { icon: "📚", to: "/category", label: "Category" },
  ];

  const accountLinks: LinkItem[] = [
    { icon: "⚙️", to: "/settings", label: "Settings" },
  ];

  const openPopup = (section: "overview" | "account") => {
    setPopupOpen(section);
    setPopupTranslateY(0);
  };

  const closePopup = () => {
    setPopupOpen(null);
    setPopupTranslateY(0);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    startYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (startYRef.current === null) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startYRef.current;
    if (diff > 0) setPopupTranslateY(diff);
  };

  const handleTouchEnd = () => {
    if (startYRef.current === null) return;
    if (popupTranslateY > 150) closePopup();
    else setPopupTranslateY(0);
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
              {overviewLinks.map(({ icon, to, label }) => (
                <li key={to} className="sidebar-li">
                  {icon}
                  <NavLink to={to}>{label}</NavLink>
                </li>
              ))}
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
              {accountLinks.map(({ icon, to, label }) => (
                <li key={to} className="sidebar-li">
                  {icon}
                  <NavLink to={to}>{label}</NavLink>
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <div className="user">
          <span className="circle" />
          <span>User</span>
        </div>
      </nav>

      {popupOpen && (
        <div
          className="popup-drawer"
          style={{ transform: `translateY(${popupTranslateY}px)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            onClick={closePopup}
            className="close-btn"
            aria-label="Close menu"
          >
            ×
          </button>
          <ul className="drawer-list">
            {(popupOpen === "overview" ? overviewLinks : accountLinks).map(
              ({ icon, to, label }) => (
                <li key={to} className="sidebar-li">
                  {icon}
                  <NavLink to={to} onClick={closePopup}>
                    {label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Sidebar;
