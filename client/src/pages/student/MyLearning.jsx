import React from "react";
import { useLoadUserQuery } from "@/features/api/authApi";
import Course from "./Course";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen } from 'lucide-react';

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();

  const myLearning = data?.user?.enrolledCourses || [];

  return (
    <div className="container mx-auto my-10 px-4">
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            My Learning
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <MyLearningSkeleton />
          ) : myLearning.length === 0 ? (
            <EmptyState />
          ) : (
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {myLearning.map((course, index) => (
                  <Course key={index} course={course} />
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyLearning;

const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, index) => (
      <Card key={index}>
        <CardContent className="p-0">
          <Skeleton className="h-48 rounded-t-lg" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const EmptyState = () => (
  <div className="text-center py-12">
    <BookOpen className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No Enrolled Courses</h3>
    <p className="text-gray-600 dark:text-gray-400">You are not enrolled in any courses yet. Start learning today!</p>
  </div>
);

