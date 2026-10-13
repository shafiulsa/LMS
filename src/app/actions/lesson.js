"use server"

import { Lesson } from "@/model/lesson.model";
import { Module } from "@/model/module-model";
import { create } from "@/queries/lessons";
import { dbConnect } from "../../../service/mongo";
import mongoose from "mongoose";

export async function createLesson(data) {
    try {
        await dbConnect();
        const title = data.get("title");
        const slug = data.get("slug");
        const moduleId = data.get("moduleId");
        const order = data.get("order");

        const createdLesson = await create({ title, slug, order });

        const module = await Module.findById(moduleId);
        if (module) {
            module.lessonIds.push(createdLesson._id);
            await module.save();
        }

        return createdLesson;

    } catch (e) {
        throw new Error(e.message || e);
    }
}

export async function reOrderLesson(data) {
    try {
        await dbConnect();
        await Promise.all(data.map(async (element) => {
            await Lesson.findByIdAndUpdate(element.id, { order: element.position });
        }));
    } catch (e) {
        throw new Error(e.message || e);
    }
}

export async function updateLesson(lessonId, data) {
    try {
        await dbConnect();
        await Lesson.findByIdAndUpdate(lessonId, data);
    } catch (error) {
        throw new Error(error.message || error);
    }
}

export async function changeLessonPublishState(lessonId) {
    try {
        await dbConnect();
        const lesson = await Lesson.findById(lessonId);
        if (!lesson) {
            throw new Error("Lesson not found");
        }
        const res = await Lesson.findByIdAndUpdate(lessonId, { active: !lesson.active }, { new: true, lean: true });
        return res.active;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

// export async function deleteLesson(lessonId, moduleId) {
//     try {
//         await dbConnect();
//         const module = await Module.findById(moduleId);
//         if (module) {
//             module.lessonIds.pull(new mongoose.Types.ObjectId(lessonId));
//             await module.save();
//         }
//         await Lesson.findByIdAndDelete(lessonId);
//     } catch (err) {
//        throw new Error(err.message || err);
//     }
// }

export async function deleteLesson(lessonId, moduleId){
    try {
        const module = await Module.findById(moduleId);
        module.lessonIds.pull(new mongoose.Types.ObjectId(lessonId));
        await Lesson.findByIdAndDelete(lessonId);
        module.save();
    } catch (err) {
        throw new Error(err);
    }
}