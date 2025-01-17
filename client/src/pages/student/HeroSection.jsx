import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
      <div className="absolute inset-0 bg-white/[0.1] dark:bg-grid-white/[0.05] bg-[size:32px_32px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent dark:from-blue-600/50" />
      <div className="max-w-5xl mx-auto relative z-10">
        <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight animate-fade-in-up">
          Find the Best Courses for You
        </h1>
        <p className="text-blue-50 dark:text-gray-300 text-lg sm:text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          Discover, Learn, and Upskill with our wide range of expert-led courses
        </p>

        <form onSubmit={searchHandler} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 animate-fade-in-up animation-delay-400">
          <div className="relative w-full max-w-md group">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Courses"
              className="w-full pl-10 pr-4 py-2 rounded-full text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 border border-blue-200 dark:border-transparent focus:border-blue-300 dark:focus:border-blue-700 transition-all duration-300 shadow-md focus:shadow-lg"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 transition-all duration-300 group-hover:text-blue-500" size={18} />
          </div>
          <Button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Search
          </Button>
        </form>
        <Button
          onClick={() => navigate(`/course/search?query`)}
          className="bg-white text-blue-600 hover:text-blue-700 dark:bg-gray-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold rounded-full px-6 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 animate-fade-in-up animation-delay-600"
        >
          <Sparkles className="inline-block mr-2" size={18} />
          Explore All Courses
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;

