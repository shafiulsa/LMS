import Hellow from "@/components/Hellow";
import Image from "next/image";
import { getCourses } from "../../queries/courses";

export default async function Home() {
  const courses = await getCourses();

  console.log(courses);  //console log the courses
  console.log(courses[0]?.instructor?.socialMedia); //console log the social media of the instructor
  console.log(courses[0]?.testimonials); //console log the social media of the user who gave the testimonial
  console.log(courses[0]?.modules); //console log the modules of the course
  return (
    <Hellow />
  );
}
