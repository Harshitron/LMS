import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock, Users } from 'lucide-react';

const Course = ({ course }) => {
  return (
    <Link to={`/course-detail/${course._id}`}>
      <Card className="overflow-hidden rounded-xl dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group">
        <div className="relative">
          <img
            src={course.courseThumbnail || "/placeholder.svg"}
            alt={course.courseTitle}
            className="w-full h-48 object-cover rounded-t-xl"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-semibold px-4 py-2 bg-blue-600 rounded-full">
              View Course
            </span>
          </div>
        </div>
        <CardContent className="px-6 py-5 space-y-4">
          <h1 className="font-bold text-xl text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            {course.courseTitle}
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 ring-2 ring-blue-500">
                <AvatarImage src={course.creator?.photoUrl || "https://github.com/shadcn.png"} alt={course.creator?.name} />
                <AvatarFallback>{course.creator?.name ? course.creator.name.charAt(0) : "?"}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-medium text-sm text-gray-700 dark:text-gray-300">{course.creator?.name}</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Instructor</p>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-3 py-1 text-xs font-semibold rounded-full">
              {course.courseLevel}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{course.courseDuration || "8 weeks"}</span>
            </div>
            
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= (course.rating || 4)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                ({course.reviewCount || "120"})
              </span>
            </div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              ₹{course.coursePrice}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;

