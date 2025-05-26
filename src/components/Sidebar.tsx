import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="user">
        <span className="circle" />
        <span>User</span>
      </div>
      <ul className="sidebar-list">
        <div className="section-title">
          <p>Overview</p>
          <li className="sidebar-li">
            <NavLink to="/">Dashboard</NavLink>
          </li>
          <li className="sidebar-li">
            <NavLink to="/category">Category</NavLink>
          </li>
        </div>
        <div className="section-title">
          <p>Account</p>
          <li className="sidebar-li">
            <NavLink to="/settings">Settings</NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Sidebar;
