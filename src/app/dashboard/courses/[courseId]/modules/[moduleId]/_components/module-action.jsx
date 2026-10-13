"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { changeModulePublishState, deleteModule } from "@/app/actions/module";
import { useRouter } from "next/navigation";

export const ModuleActions = ({ module, courseId }) => {
    const router = useRouter();
    const isInitialActive = typeof module?.active === "string" 
        ? module?.active === "true" 
        : Boolean(module?.active);

    const [published, setPublished] = useState(isInitialActive);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const isActive = typeof module?.active === "string" 
            ? module?.active === "true" 
            : Boolean(module?.active);
        setPublished(isActive);
    }, [module?.active]);

    const moduleId = module?.id || module?._id;

    async function handlePublishToggle() {
        if (!moduleId) return;
        try {
            setIsLoading(true);
            const activeState = await changeModulePublishState(moduleId);
            setPublished(activeState);
            toast.success("The module has been updated");
            router.refresh();
        } catch (e) {
            toast.error(e.message || "Failed to update module");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDelete() {
        if (published) {
            toast.error("A published module cannot be deleted. First unpublish it, then delete");
            return;
        }
        if (!moduleId || !courseId) {
            toast.error("Missing module or course ID");
            return;
        }
        try {
            setIsLoading(true);
            await deleteModule(moduleId, courseId);
            toast.success("Module deleted");
            router.push(`/dashboard/courses/${courseId}`);
            router.refresh();
        } catch (e) {
            toast.error(e.message || "Failed to delete module");
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