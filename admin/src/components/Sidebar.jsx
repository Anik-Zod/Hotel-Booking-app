import { Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaBox,
  FaClipboardList,
  FaFileAlt,
  FaShapes,
  FaStickyNote,
  FaWpforms,
  FaCalendar,
  FaCog,
  FaDatabase,
  FaChartBar,
  FaFile,
} from "react-icons/fa";

function SidebarItem({ to, icon: Icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200 p-3 rounded-lg"
    >
      <Icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

export default function Sidebar() {
  return (
    <div className=" bg-gray-800 text-white p-5 min-h-screen shadow-lg">
      {/* Main Section */}
      <div className="mb-4">
        <span className="text-gray-500 uppercase text-xs font-bold tracking-wider">
          Main
        </span>
        <SidebarItem to="/" icon={FaHome} label="Homepage" />
        <SidebarItem to={`/users/${JSON.parse(localStorage.getItem("user"))?._id}`}
 icon={FaUser} label="Profile" />
      </div>

      {/* Lists Section */}
      <div className="mb-4">
        <span className="text-gray-500 uppercase text-xs font-bold tracking-wider">
          Lists
        </span>
        <SidebarItem to="/users" icon={FaUser} label="Users" />
        <SidebarItem to="/hotels" icon={FaBox} label="Hotels" />
        <SidebarItem to="/rooms" icon={FaClipboardList} label="Rooms" />
      </div>

      {/* General Section */}
      <div className="mb-4">
        <span className="text-gray-500 uppercase text-xs font-bold tracking-wider">
          General
        </span>
        <SidebarItem to="#" icon={FaShapes} label="Elements" />
        <SidebarItem to="#" icon={FaStickyNote} label="Notes" />
        <SidebarItem to="#" icon={FaWpforms} label="Forms" />
        <SidebarItem to="#" icon={FaCalendar} label="Calendar" />
      </div>

    </div>
  );
}
