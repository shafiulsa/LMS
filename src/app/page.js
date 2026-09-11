import Hellow from "@/components/Hellow";
import Image from "next/image";
import { getCourses } from "../../queries/courses";

export default async function Home() {
  const courses = await getCourses();

  console.log(courses);  //console log the courses
  return (
    <Hellow />
  );
}
