import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SearchResult = ({ course }) => {
  return (
    <Card className="mb-4 hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Link to={`/course-detail/${course._id}`} className="w-full md:w-auto">
            <img
              src={course.courseThumbnail || "/placeholder.svg"}
              alt={course.courseTitle}
              className="h-48 w-full md:w-64 object-cover rounded-md"
            />
          </Link>
          <div className="flex flex-col justify-between flex-1">
            <div>
              <Link to={`/course-detail/${course._id}`}>
                <CardTitle className="text-xl mb-2 hover:text-blue-600 transition-colors duration-300">
                  {course.courseTitle}
                </CardTitle>
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{course.subTitle}</p>
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={course.creator?.photoUrl} alt={course.creator?.name} />
                  <AvatarFallback>{course.creator?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {course.creator?.name}
                </span>
              </div>
              <Badge variant="secondary" className="mb-2">{course.courseLevel}</Badge>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="font-bold text-lg md:text-xl">₹{course.coursePrice}</span>
              <Link to={`/course-detail/${course._id}`} className="text-blue-600 hover:underline text-sm">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchResult;

