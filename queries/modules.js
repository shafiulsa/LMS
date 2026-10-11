import { Module } from "@/model/module-model";

export async function create(moduleData) {
    try {
        const module = await Module.create(moduleData);
        return JSON.parse(JSON.stringify(module));
    } catch (error) {
        throw new Error(error);
    }
}