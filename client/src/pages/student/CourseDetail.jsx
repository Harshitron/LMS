import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  const [activeTab, setActiveTab] = useState("description");

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 text-white">
        <div className="flex flex-col items-center gap-4">
          {/* Circular Spinner */}
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-white"></div>
          {/* Fallback Message */}
          <h1 className="text-xl font-semibold animate-pulse">
            Preparing your course details...
          </h1>
          <p className="text-sm text-gray-200">
            This won't take long. Stay tuned! 🎉
          </p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-screen dark:bg-gray-900 dark:text-gray-200">
        <div className="text-2xl font-bold text-red-500">
          Failed to load course details
        </div>
      </div>
    );

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-200 min-h-screen">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="absolute inset-0 bg-opacity-30 bg-cover bg-center" style={{ backgroundImage: 'url("/path-to-background.jpg")' }}></div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold animate-fadeInUp">
            {course?.courseTitle}
          </h1>
          <p className="text-lg md:text-2xl font-light">
            {course?.subTitle || "No Subtitle Available"}
          </p>
          <p className="text-lg flex items-center gap-2">
            Created by{" "}
            <span className="text-yellow-300 underline italic">
              {course?.creator?.name}
            </span>
          </p>
          <div className="flex items-center gap-4">
            <BadgeInfo size={24} className="text-yellow-300" />
            <p className="text-base">
              Last updated: {course?.createdAt.split("T")[0]}
            </p>
          </div>
          <p className="text-lg">
            Enrolled Students:{" "}
            <span className="font-bold">{course?.enrolledStudents.length}</span>
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 my-10 space-y-12">
        {/* Tabs for Description and Content */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 space-y-4">
          <div className="flex border-b border-gray-300 dark:border-gray-700">
            <button
              className={`flex-1 py-3 text-lg font-medium ${activeTab === "description"
                  ? "text-indigo-600 border-b-4 border-indigo-600 dark:text-indigo-400"
                  : "text-gray-500 dark:text-gray-400"
                }`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`flex-1 py-3 text-lg font-medium ${activeTab === "content"
                  ? "text-indigo-600 border-b-4 border-indigo-600 dark:text-indigo-400"
                  : "text-gray-500 dark:text-gray-400"
                }`}
              onClick={() => setActiveTab("content")}
            >
              Course Content
            </button>
          </div>

          <div className="transition-all duration-300">
            {activeTab === "description" && (
              <p
                className="text-gray-700 dark:text-gray-300 text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: course.description }}
              />
            )}
            {activeTab === "content" && (
              <Card className="border border-gray-200 dark:border-gray-700 shadow-md p-4">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {course?.lectures.length || 0} Lectures
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {course.lectures.map((lecture, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-2 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      <span>
                        {purchased ? (
                          <PlayCircle
                            size={20}
                            className="text-green-500 dark:text-green-400"
                          />
                        ) : (
                          <Lock size={20} className="text-gray-400 dark:text-gray-500" />
                        )}
                      </span>
                      <p className="text-sm">{lecture.lectureTitle}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Video Player & Purchase Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
              <ReactPlayer
                width="100%"
                height="100%"
                url={course?.lectures[0]?.videoUrl || ""}
                controls
              />
            </div>
            <h2 className="mt-4 text-lg font-medium text-center">
              {course?.lectures[0]?.lectureTitle || "No Lecture Available"}
            </h2>
          </div>
          <Card className="shadow-xl bg-white dark:bg-gray-800">
            <CardContent className="space-y-6">
              <h1 className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 text-center">
                ₹{course?.coursePrice !== undefined ? course.coursePrice : "N/A"}
              </h1>
              {purchased ? (
                <Button
                  onClick={handleContinueCourse}
                  className="w-full bg-green-500 hover:bg-green-600 transition-all"
                >
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>✓ Full lifetime access</p>
              <p>✓ Access on mobile and TV</p>
              <p>✓ Certificate of completion</p>
            </CardFooter>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default CourseDetail;
