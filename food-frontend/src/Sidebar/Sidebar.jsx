import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkClass =
    "list-group-item list-group-item-action list-group-item-light p-3";
  return (
    <div className="border-end bg-white" id="sidebar-wrapper">
      <div className="sidebar-heading border-bottom bg-light">Food Admin</div>
      <div className="list-group list-group-flush">
        <NavLink className={linkClass} to="/add">Add Food</NavLink>
        <NavLink className={linkClass} to="/list">List Food</NavLink>
        <NavLink className={linkClass} to="/orders">Orders</NavLink>
      </div>
    </div>
  );
}

export default Sidebar;