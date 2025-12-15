"use client";

import { JSX } from "react";

interface NavItem {
  title: "Home";
  icon: JSX.Element;
}
const navItems: NavItem[] = [{ title: "Home", icon: <></> }];
const SideBar = () => {
  return (
    <aside>
      {/* Nav Items  */}
      <div>
        {" "}
        Home <span>Icon</span>
      </div>
    </aside>
  );
};

export default SideBar;
