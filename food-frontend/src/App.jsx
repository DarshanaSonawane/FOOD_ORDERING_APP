import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Order from "./orders/Order";
import Listfood from "./pages/Listfood/Listfood";
import Addfood from "./pages/Addfood/Addfood";
import Sidebar from "./Sidebar/Sidebar";
import Menubar from "./MenuBar/Menubar";

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <div className="d-flex" id="wrapper">
      {sidebarVisible && <Sidebar />}
      <div id="page-content-wrapper" className="flex-grow-1">
        <Menubar toggleSidebar={toggleSidebar} />
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Listfood />} />
            <Route path="/add" element={<Addfood />} />
            <Route path="/list" element={<Listfood />} />
            <Route path="/orders" element={<Order />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;