import Sidebar from "../Sidebar/Sidebar";
import "./Layout.scss"
import { Outlet } from "react-router";

const Layout = () => (
    <div className="layout-container">
        <Sidebar />
        <div className="layout-content">
            <Outlet />
        </div>
    </div>
);

export default Layout;