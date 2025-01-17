import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice
  });

  const isEmpty = !isLoading && data?.courses.length === 0;

  const handleFilterChange = (categories, price) => {
    setSelectedCategories(categories);
    setSortByPrice(price);
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl md:text-2xl font-bold mb-2">Results for "{query}"</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing results for <span className="text-blue-600 dark:text-blue-400 font-semibold italic">{query}</span>
          </p>
        </CardContent>
      </Card>
      <div className="flex flex-col md:flex-row gap-8">
        <Filter handleFilterChange={handleFilterChange}/>
        <div className="flex-1">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <CourseSkeleton key={idx} />
            ))
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            data?.courses?.map((course) => <SearchResult key={course._id} course={course}/>)
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseNotFound = () => {
  return (
    <Card className="text-center p-8">
      <CardContent className="flex flex-col items-center">
        <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
        <h2 className="font-bold text-2xl md:text-3xl text-gray-800 dark:text-gray-200 mb-2">
          Course Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
          Sorry, we couldn't find the course you're looking for.
        </p>
        <Link to="/">
          <Button variant="outline">Browse All Courses</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between border-b border-gray-300 py-4 gap-4">
      <Skeleton className="h-32 w-full md:w-56 rounded" />
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-20 mt-2" />
      </div>
      <Skeleton className="h-6 w-20 self-start md:self-center" />
    </div>
  );
};

