import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <MobileNav />
      <main className="lg:ml-[var(--sidebar-width)] pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  );
};

export default Layout;
