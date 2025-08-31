import React from "react";
import { NavLink } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded bg-black"></div>
          <span className="font-semibold">
            nextmind <span className="text-green-600">elite</span>
          </span>
        </div>

        <nav className="flex flex-col gap-4 text-gray-700">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-black font-medium" : "hover:text-black"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/portfolio"
            className={({ isActive }) =>
              isActive ? "text-black font-medium" : "hover:text-black"
            }
          >
            Portfolios
          </NavLink>
          <NavLink to="/experimentals" className="hover:text-black">
            Experimentals
          </NavLink>
          <NavLink to="/slack-archives" className="hover:text-black">
            Slack Archives
          </NavLink>
          <NavLink to="/account" className="hover:text-black">
            Account
          </NavLink>
        </nav>
      </aside>

      {/* Page Content */}
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
