import mongoose, { Schema } from "mongoose";

const enrollmentSchema = new Schema({
    enrollment_date: {
        required: true,
        type: Date
    },
    status: {
        required: true,
        type: String
    },
    completion_date: {
        required: false,
        type: Date
    },
    method: {
        required: true,
        type: String
    },
    course: { type: Schema.ObjectId, ref: "Course" },
    student: { type: Schema.ObjectId, ref: "User" },
});

// Clear cached model in development if it still has the old schema where completion_date was required
if (mongoose.models?.Enrollment?.schema?.path("completion_date")?.isRequired) {
    delete mongoose.models.Enrollment;
}

export const Enrollment = mongoose.models.Enrollment ?? mongoose.model("Enrollment", enrollmentSchema);