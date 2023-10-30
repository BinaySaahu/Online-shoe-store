import Link from "next/link";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

const Menu = ({ showCatmenu, setShowCatmenu }) => {
  const data = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "About", url: "/about" },
    { id: 3, name: "Categories", subMenu: true },
    { id: 4, name: "Contact", url: "/contact" },
  ];

  const subMenuData = [
    { id: 1, name: "jordan", doc_count: 11 },
    { id: 2, name: "sneakers", doc_count: 8 },
    { id: 3, name: "running", doc_count: 64 },
    { id: 4, name: "football", doc_count: 107 },
  ];
  return (
    <ul className="hidden md:flex items-center gap-8 font-medium text-black">
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {!!item?.subMenu ? (
              <li
                className="cursor-pointer flex items-center gap-2 relative"
                onMouseEnter={() => setShowCatmenu(true)}
                onMouseLeave={() => setShowCatmenu(false)}
              >
                {item.name}
                <BsChevronDown size={14} />
                {showCatmenu && (
                  <ul className="bg-white absolute top-6 left-0 min-w-[250px] px-1 py-1 text-black shadow-lg">
                    {subMenuData.map((subMenu) => {
                      return (
                        <Link href={`/category/${subMenu.name}`} key={subMenu.id} onClick={() => setShowCatmenu(false)}>
                          <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md">
                            {subMenu.name}
                            <span className="opacity-50 text-sm">
                            </span>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li className="cursor-pointer">
                <Link href={item?.url}>{item.name}</Link>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Menu;
