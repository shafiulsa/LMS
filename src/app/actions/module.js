"use server";

import { Course } from "@/model/course-model";
import { Module } from "@/model/module-model";
import { Lesson } from "@/model/lesson.model";
import { create } from "@/queries/modules";
import { dbConnect } from "../../../service/mongo";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function createModule(data) {
  try {
    await dbConnect();
    const title = data.get("title");
    const slug = data.get("slug");
    const courseId = data.get("courseId");
    const order = data.get("order");

    const createdModule = await create({ title, slug, course: courseId, order });
    const course = await Course.findById(courseId);
    if (course) {
      course.modules.push(createdModule._id);
      await course.save();
    }

    return createdModule;
  } catch (e) {
    throw new Error(e.message || e);
  }
}

export async function reOrderModules(data) {
  try {
    await dbConnect();
    await Promise.all(
      data.map(async (element) => {
        await Module.findByIdAndUpdate(element.id, { order: element.position });
      })
    );
  } catch (e) {
    throw new Error(e.message || e);
  }
}

export async function updateModule(moduleId, data) {
  try {
    await dbConnect();
    await Module.findByIdAndUpdate(moduleId, data);
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function changeModulePublishState(moduleId) {
  try {
    await dbConnect();
    const module = await Module.findById(moduleId);
    if (!module) {
      throw new Error("Module not found");
    }
    const res = await Module.findByIdAndUpdate(
      moduleId,
      { active: !module.active },
      { new: true, lean: true }
    );
    return res.active;
  } catch (error) {
    throw new Error(error.message || error);
  }
}

export async function deleteModule(moduleId, courseId) {
  try {
    await dbConnect();
    const course = await Course.findById(courseId);
    course.modules.pull(new mongoose.Types.ObjectId(moduleId));
    await Module.findByIdAndDelete(moduleId);
    await course.save();
    revalidatePath(`/dashboard/courses/${courseId}`);
  } catch (err) {
    throw new Error(err);
  }
}