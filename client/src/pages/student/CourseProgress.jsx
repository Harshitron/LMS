import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay, BookOpen, AlertCircle } from 'lucide-react';

const CourseProgress = () => {
  const { courseId } = useParams();
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);
  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [completeCourse, { isSuccess: completedSuccess }] = useCompleteCourseMutation();
  const [inCompleteCourse, { isSuccess: inCompletedSuccess }] = useInCompleteCourseMutation();
  const [currentLecture, setCurrentLecture] = useState(null);

  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success("Course marked as completed!");
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success("Course marked as incomplete.");
    }
  }, [completedSuccess, inCompletedSuccess, refetch]);

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle, lectures } = courseDetails;

  const initialLecture = currentLecture || (lectures && lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };

  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  const completedLectures = progress.filter((prog) => prog.viewed).length;
  const totalLectures = lectures.length;
  const progressPercentage = (completedLectures / totalLectures) * 100;

  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      <CourseHeader 
        title={courseTitle} 
        completed={completed}
        onComplete={handleCompleteCourse}
        onIncomplete={handleInCompleteCourse}
      />
      <Progress value={progressPercentage} className="my-4" />
      <div className="flex flex-col md:flex-row gap-6">
        <VideoPlayer 
          lecture={currentLecture || initialLecture} 
          onPlay={() => handleLectureProgress(currentLecture?._id || initialLecture._id)}
        />
        <LectureSidebar 
          lectures={lectures}
          currentLecture={currentLecture || initialLecture}
          isLectureCompleted={isLectureCompleted}
          onSelectLecture={handleSelectLecture}
        />
      </div>
    </div>
  );
};

const CourseHeader = ({ title, completed, onComplete, onIncomplete }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
    <h1 className="text-2xl font-bold">{title}</h1>
    <Button
      onClick={completed ? onIncomplete : onComplete}
      variant={completed ? "outline" : "default"}
    >
      {completed ? (
        <div className="flex items-center">
          <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>
        </div>
      ) : (
        "Mark as completed"
      )}
    </Button>
  </div>
);

const VideoPlayer = ({ lecture, onPlay }) => (
  <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4 bg-white dark:bg-gray-800">
    <video
      src={lecture.videoUrl}
      controls
      className="w-full h-auto md:rounded-lg"
      onPlay={onPlay}
    />
    <div className="mt-4">
      <h3 className="font-medium text-lg">{lecture.lectureTitle}</h3>
    </div>
  </div>
);

const LectureSidebar = ({ lectures, currentLecture, isLectureCompleted, onSelectLecture }) => (
  <Card className="flex flex-col w-full md:w-2/5">
    <CardContent className="p-4">
      <h2 className="font-semibold text-xl mb-4 flex items-center">
        <BookOpen className="mr-2" /> Course Lectures
      </h2>
      <ScrollArea className="h-[60vh]">
        {lectures.map((lecture, index) => (
          <Card
            key={lecture._id}
            className={`mb-3 hover:cursor-pointer transition transform ${
              lecture._id === currentLecture._id
                ? "bg-gray-100 dark:bg-gray-700"
                : ""
            }`}
            onClick={() => onSelectLecture(lecture)}
          >
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center">
                {isLectureCompleted(lecture._id) ? (
                  <CheckCircle2 size={24} className="text-green-500 mr-2" />
                ) : (
                  <CirclePlay size={24} className="text-gray-500 mr-2" />
                )}
                <div>
                  <CardTitle className="text-sm font-medium">
                    {index + 1}. {lecture.lectureTitle}
                  </CardTitle>
                </div>
              </div>
              {isLectureCompleted(lecture._id) && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  Completed
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </CardContent>
  </Card>
);

const LoadingState = () => (
  <div className="max-w-7xl mx-auto p-4 mt-20 space-y-4">
    <Skeleton className="h-8 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <div className="flex flex-col md:flex-row gap-6">
      <Skeleton className="h-96 w-full md:w-3/5" />
      <div className="w-full md:w-2/5 space-y-4">
        <Skeleton className="h-10 w-full" />
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  </div>
);

const ErrorState = () => (
  <div className="max-w-7xl mx-auto p-4 mt-20 text-center">
    <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
    <h2 className="text-2xl font-bold text-red-600 mb-2">Oops! Something went wrong</h2>
    <p className="text-gray-600 dark:text-gray-400">Failed to load course details. Please try again later.</p>
  </div>
);

export default CourseProgress;

