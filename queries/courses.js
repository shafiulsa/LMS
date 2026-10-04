import { Course } from "../model/course-model";
import { Category } from "../model/category-model";
import { User } from "../model/user-model";
import { Testimonial } from "../model/testimonial-model";
import { Module } from "../model/module-model";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/lib/convertData";
import { getTestimonialsForCourse } from "./testimonials";
import { getEnrollmentsForCourse } from "./enrollments";


export async function getCourseList() {
  const courses= await Course.find({}).select(["title","subtitle","thumbnail","modules","price","category","instructor"]).populate({
    path: "category",
    model: Category,
  }).populate({
    path: "instructor",
    model: User,
  }).populate({
    path: "testimonials",
    model: Testimonial,
  }).populate({
    path: "modules",
    model: Module,
  }).lean();
  return replaceMongoIdInArray(courses);
}  


export async function getCourseDetails(id) {
  if (!id) return null;
  const course = await Course.findById(id)
  .populate({
      path: "category",
      model: Category
  }).populate({
      path: "instructor",
      model: User
  }).populate({
      path: "testimonials",
      model: Testimonial,
      populate: {
          path: "user",
          model: User
      }
  }).populate({
      path: "modules",
      model: Module
  }).lean();
  return replaceMongoIdInObject(course);
}  


export async function getCourseDetailsByInstructor(instructorId){
    const courses = await Course.find({instructor: instructorId })
    .populate({path: "category", model: Category })
    .populate({ path: "instructor", model: User})
    .lean();

    const enrollments = await Promise.all(
        courses.map(async (course) => {
            const enrollment = await getEnrollmentsForCourse(course.
                _id.toString());
                return enrollment;
        })
    );

    const totalEnrollments = enrollments.reduce(( acc, obj )=> {
        return acc + obj.length;
    },0);
    
    const tesimonials = await Promise.all(
        courses.map(async (course) => {
            const tesimonial = await getTestimonialsForCourse(course.
                _id.toString());
                return tesimonial;
        })
    );

    const totalTestimonials = tesimonials.flat();
    const avgRating = totalTestimonials.length > 0
        ? (totalTestimonials.reduce(function (acc, obj) {
            return acc + obj.rating;
        }, 0)) / totalTestimonials.length
        : 0; 

    const instructor = (courses.length > 0 && courses[0]?.instructor)
        ? courses[0]?.instructor
        : await User.findById(instructorId).lean();

    const firstName = instructor?.firstName || "Unknown";
    const lastName = instructor?.lastName || "";
    const fullInsName = `${firstName} ${lastName}`.trim();

    const Designation = instructor?.designation || "Unknown"; 

    const insImage = instructor?.profilePicture || "Unknown"; 

    const bio = instructor?.bio || "";

    return {
        "courses" : courses.length,
        "enrollments": totalEnrollments,
        "reviews" : totalTestimonials.length,
        "ratings" : avgRating ? avgRating.toPrecision(2) : 0,
        "inscourses" : courses,
        fullInsName,
        Designation,
        insImage,
        bio
    } 
}