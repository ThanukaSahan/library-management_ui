// src/Sidebar.js
import JWTService from "../common/JWTService ";
import "../css/Sidebar.css";
import React, { useState } from "react";

const Sidebar = () => {
  const [userRole, setUserRole] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const menuItems = [
    { name: "Home", path: "/" },
    JWTService.pageAccess("Admin,Manager")
      ? {
          name: "Master",
          path: "#",
          subMenu: [
            { name: "Author", path: "/author" },
            {
              name: "Category",
              path: "#",
            },
            { name: "Publisher", path: "#" },
          ],
        }
      : [],
    { name: "Settings", path: "#" },
    { name: "Logout", path: "#" },
  ];

  const handleSubmenuToggle = (index) => {
    if (openSubMenu == index) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(index);
    }
  };
  return (
    <div className="flex text-left">
      <div
        className={`bg-gray-800 text-white w-64  h-screen space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          isOpen ? "-translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-Red focus:outline-none  absolute top-2 right-2 bg-gray-800 hover:bg-gray-700 w-11"
        >
          {isOpen ? "<<" : ">>"}
        </button>

        <h1 className="text-2xl font-semibold text-center">My App</h1>

        <nav>
          {menuItems
            .filter((item) => item && Object.keys(item).length > 0)
            .map((item, index) => (
              <div key={index}>
                {item ? (
                  <>
                    <a
                      href={item.path}
                      onClick={(e) => {
                        if (item.subMenu) {
                          e.preventDefault();
                          handleSubmenuToggle(index);
                        }
                      }}
                      className={`text-left flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 text-white no-underline ${
                        isOpen ? "justify-left" : "justify-left"
                      }`}
                    >
                      {item.name}
                    </a>
                    {item.subMenu && openSubMenu === index && (
                      <div className="ml-8 space-y-2">
                        {item.subMenu.map((subItem, subIndex) => (
                          <a
                            href={subItem.path}
                            key={subIndex}
                            className="block py-1 px-2 rounded transition duration-200 hover:bg-gray-600 text-white no-underline"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : null}
              </div>
            ))}
        </nav>
      </div>
      <div
        className="flex-1 h-screen" // Ensures the content area matches the sidebar's height
        onClick={() => setIsOpen(false)} // Optional: Click outside to collapse
      >
        {/* Content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
