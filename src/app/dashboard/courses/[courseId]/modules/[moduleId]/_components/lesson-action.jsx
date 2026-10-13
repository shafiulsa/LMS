"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { changeLessonPublishState, deleteLesson } from "@/app/actions/lesson";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const LessonActions = ({ lesson, moduleId, onDelete }) => {
  const router = useRouter();
  const [published, setPublished] = useState(lesson?.active);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPublished(lesson?.active);
  }, [lesson?.active]);

  const lessonId = lesson?.id || lesson?._id;

  async function handlePublishToggle() {
    if (!lessonId) return;
    try {
      setIsLoading(true);
      const newActiveState = await changeLessonPublishState(lessonId);
      setPublished(newActiveState);
      toast.success("The lesson has been updated");
      router.refresh();
    } catch (e) {
      toast.error(e.message || "Failed to update lesson");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    if (published) {
      toast.error("A published lesson can not be deleted. First unpublish it, then delete");
      return;
    }
    if (!lessonId || !moduleId) {
      toast.error("Missing lesson or module ID");
      return;
    }
    try {
      setIsLoading(true);
      await deleteLesson(lessonId, moduleId);
      toast.success("Lesson deleted");
      if (onDelete) {
        onDelete();
      }
    } catch (e) {
      toast.error(e.message || "Failed to delete lesson");
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