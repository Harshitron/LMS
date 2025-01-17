import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { BarChartIcon, SquareLibrary, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

// Inline utility function for class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const sidebarItems = [
    { icon: BarChartIcon, label: "Dashboard", path: "dashboard" },
    { icon: SquareLibrary, label: "Courses", path: "course" },
  ];

  const SidebarContent = ({ className = "" }) => (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex items-center justify-between p-4">
        <h2 className={cn("font-semibold text-lg", isCollapsed && "hidden")}>Admin Panel</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>
      <nav className="space-y-2 flex-1">
        {sidebarItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              location.pathname.includes(item.path)
                ? "bg-gray-200 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                : "hover:bg-gray-100 dark:hover:bg-gray-800",
              isCollapsed && "justify-center"
            )}
          >
            <item.icon size={22} />
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden lg:block border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all duration-300",
          isCollapsed ? "w-[70px]" : "w-[250px]"
        )}
      >
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden fixed top-16 left-4 z-50">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px] p-0">
          <SidebarContent className="h-full" />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

