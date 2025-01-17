import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, School, ChevronDown, LogOut, User, BookOpen, LayoutDashboard } from 'lucide-react';
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useLogoutUserMutation } from "@/features/api/authApi";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out successfully.");
      navigate("/login");
    }
  }, [isSuccess, data, navigate]);

  return (
    <nav className="h-16 dark:bg-gray-900 bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 transition-transform duration-300 hover:scale-105">
              <School size={30} className="text-blue-600 dark:text-blue-400" />
              <h1 className="hidden sm:block font-extrabold text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
                E-Learning
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <UserMenu user={user} logoutHandler={logoutHandler} />
            ) : (
              <AuthButtons navigate={navigate} />
            )}
            <DarkMode />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-4">
            <DarkMode />
            <MobileNavbar user={user} logoutHandler={logoutHandler} />
          </div>
        </div>
      </div>
    </nav>
  );
};

const UserMenu = ({ user, logoutHandler }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800">
        <Avatar>
          <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt={user?.name} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="font-medium">{user?.name}</span>
        <ChevronDown size={16} />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56 animate-in slide-in-from-top-1 fade-in-20">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Link to="my-learning" className="flex items-center w-full">
            <BookOpen className="mr-2 h-4 w-4" />
            <span>My Learning</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="profile" className="flex items-center w-full">
            <User className="mr-2 h-4 w-4" />
            <span>Edit Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logoutHandler}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      {user?.role === "instructor" && (
        <>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/admin/dashboard" className="flex items-center w-full">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        </>
      )}
    </DropdownMenuContent>
  </DropdownMenu>
);

const AuthButtons = ({ navigate }) => (
  <div className="flex items-center gap-2">
    <Button variant="ghost" onClick={() => navigate("/login")} className="hover:bg-gray-100 dark:hover:bg-gray-800">
      Login
    </Button>
    <Button onClick={() => navigate("/signup")} className="bg-blue-600 hover:bg-blue-700 text-white">
      Sign Up
    </Button>
  </div>
);

const MobileNavbar = ({ user, logoutHandler }) => {
  const navigate = useNavigate();
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-800" variant="ghost">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>
            <Link to="/" className="flex items-center gap-2">
              <School size={24} className="text-blue-600 dark:text-blue-400" />
              <span className="font-bold text-xl">E-Learning</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-4 mt-8">
          {user ? (
            <>
              <Link to="/my-learning" className="flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200">
                <BookOpen className="mr-2 h-5 w-5" />
                <span>My Learning</span>
              </Link>
              <Link to="/profile" className="flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200">
                <User className="mr-2 h-5 w-5" />
                <span>Edit Profile</span>
              </Link>
              <button onClick={logoutHandler} className="flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 w-full text-left">
                <LogOut className="mr-2 h-5 w-5" />
                <span>Log out</span>
              </button>
              {user?.role === "instructor" && (
                <Link to="/admin/dashboard" className="flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200">
                  <LayoutDashboard className="mr-2 h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              )}
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate("/login")} className="justify-start">
                Login
              </Button>
              <Button onClick={() => navigate("/signup")} className="bg-blue-600 hover:bg-blue-700 text-white">
                Sign Up
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;

