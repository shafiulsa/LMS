import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    subtitle: {
        type: String,
        default: "subtitle"
    },
    description: {
        required: true,
        type: String
    },
    thumbnail: {
        type: String
    },
    modules: [{ type: Schema.ObjectId, ref: "Module" }],

    price: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: false
    },
    category: { type: Schema.ObjectId, ref: "Category" },

    instructor: { type: Schema.ObjectId, ref: "User" },

    testimonials: [{ type: Schema.ObjectId, ref: "Testimonial" }],

    quizSet: {
        type: Schema.ObjectId
    },
    learning: {
        type: [String]
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    modifiedOn: {
        type: Date,
        default: Date.now
    },
});
export const Course = mongoose.models.Course ?? mongoose.model("Course", courseSchema);