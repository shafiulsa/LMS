"use server"

import { getLoggedInUser } from "@/lib/loggedin-user"
import { Course } from "@/model/course-model";
import { create } from "@/queries/courses";

import { dbConnect } from "../../../service/mongo";
import { revalidatePath } from "next/cache";

export async function createCourse(data){
    try {
        const loggedinUser = await getLoggedInUser();
        data["instructor"] = loggedinUser?.id
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