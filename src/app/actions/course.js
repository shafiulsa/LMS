"use server"

import { getLoggedInUser } from "@/lib/loggedin-user"
import { Course } from "@/model/course-model";
import { Module } from "@/model/module-model";
import { Lesson } from "@/model/lesson.model";
import { create } from "@/queries/courses";
import { dbConnect } from "../../../service/mongo";
import { revalidatePath } from "next/cache";

export async function createCourse(data) {
    try {
        await dbConnect();
        const loggedinUser = await getLoggedInUser();
        data["instructor"] = loggedinUser?.id;
        const course = await create(data);
        return course;
    } catch (e) {
        throw new Error(e.message || e);
    }
}

export async function updateCourse(courseId, dataToUpdate) {
    try {
        await dbConnect();
        await Course.findByIdAndUpdate(courseId, dataToUpdate);
        revalidatePath(`/dashboard/courses/${courseId}`);
    } catch (e) {
        throw new Error(e.message || e);
    }
}

export async function changeCoursePublishState(courseId) {
    try {
        await dbConnect();
        const course = await Course.findById(courseId);
        if (!course) {
            throw new Error("Course not found");
        }
        const res = await Course.findByIdAndUpdate(
            courseId,
            { active: !course.active },
            { new: true, lean: true }
        );
        revalidatePath(`/dashboard/courses/${courseId}`);
        revalidatePath(`/dashboard/courses`);
        return res.active;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

export async function deleteCourse(courseId) {
    try {
        await dbConnect();
        const course = await Course.findById(courseId);
        if (!course) {
            throw new Error("Course not found");
        }

        if (course.modules?.length > 0) {
            const modules = await Module.find({ _id: { $in: course.modules } });
            for (const mod of modules) {
                if (mod.lessonIds?.length > 0) {
                    await Lesson.deleteMany({ _id: { $in: mod.lessonIds } });
                }
            }
            await Module.deleteMany({ _id: { $in: course.modules } });
        }

        await Course.findByIdAndDelete(courseId);
        revalidatePath(`/dashboard/courses`);
    } catch (error) {
        throw new Error(error.message || error);
    }
}