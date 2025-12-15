"use client";

import { JSX } from "react";

interface NavItem {
  title: "Home";
  icon: JSX.Element;
}
const navItems: NavItem[] = [
  {
    title: "Home",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
  },
];
const SideBar = () => {
  return (
    <aside>
      {/* Nav Items  */}
      {navItems.map((navItem, index) => (
        <div key={`${index + navItem.title}`}>
          {navItem.title}
          <span>{navItem.icon}</span>
        </div>
      ))}
    </aside>
  );
};

export default SideBar;
