import { ReactNode } from "react";

import { Navbar } from "@/src/components/navbar";
import { Sidebar } from "@/src/components/Sidebar";

type layoutProps = {
  children: ReactNode;
};

const layout = ({ children }: layoutProps) => {
  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="container mx-auto max-w-7xl pt-16 px-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default layout;
