import NextLink from "next/link";
import clsx from "clsx";
import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/src/config/site";

export const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 shadow-md">
      <div className="px-6 py-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold">ACME</h1>
      </div>
      <nav className="flex-grow px-6 py-4">
        <ul className="space-y-4">
          {siteConfig.navMenuItems.map((item) => (
            <li key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "block  hover:text-yellow-400 transition duration-200",
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="px-6 py-4 border-t border-gray-800">
        <p className="text-sm text-gray-400">© 2024 ACME Inc.</p>
      </div>
    </aside>
  );
};
