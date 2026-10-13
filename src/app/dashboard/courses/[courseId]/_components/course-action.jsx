"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { changeCoursePublishState, deleteCourse } from "@/app/actions/course";
import { useRouter } from "next/navigation";

export const CourseActions = ({ courseId, course }) => {
  const router = useRouter();
  const isInitialActive = typeof course?.active === "string"
    ? course?.active === "true"
    : Boolean(course?.active);

  const [published, setPublished] = useState(isInitialActive);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isActive = typeof course?.active === "string"
      ? course?.active === "true"
      : Boolean(course?.active);
    setPublished(isActive);
  }, [course?.active]);

  async function handlePublishToggle() {
    if (!courseId) return;
    try {
      setIsLoading(true);
      const activeState = await changeCoursePublishState(courseId);
      setPublished(activeState);
      toast.success("Course updated");
      router.refresh();
    } catch (e) {
      toast.error(e.message || "Failed to update course");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    if (published) {
      toast.error("A published course cannot be deleted. First unpublish it, then delete");
      return;
    }
    if (!courseId) return;
    try {
      setIsLoading(true);
      await deleteCourse(courseId);
      toast.success("Course deleted");
      router.push("/dashboard/courses");
      router.refresh();
    } catch (e) {
      toast.error(e.message || "Failed to delete course");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        type="button"
        disabled={isLoading}
        variant="outline"
        size="sm"
        onClick={handlePublishToggle}
      >
        {published ? "Unpublish" : "Publish"}
      </Button>

      <Button
        type="button"
        disabled={isLoading}
        size="sm"
        onClick={handleDelete}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};
