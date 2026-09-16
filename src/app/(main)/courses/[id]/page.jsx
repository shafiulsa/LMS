
import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import CourseDetails from "./_components/CourseDetails";
import Testimonials from "./_components/Testimonials";
import RelatedCourses from "./_components/RelatedCourses";
import { getCourseDetails } from "../../../../../queries/courses";
import { replaceMongoIdInArray } from "@/lib/convertData";


const SingleCoursePage = async ({ params }) => {
  const { id } = await params;

  const course = await getCourseDetails(id);

  // console.log(course);

  return (
    <>

      <CourseDetailsIntro
        title={course?.title}
        subtitle={course?.subtitle}
        thumbnail={course?.thumbnail}
      />
      <CourseDetails course={course} />
    {/* if have data then display if not then handle this  */}
      {
        course?.testimonials && <Testimonials testimonials={replaceMongoIdInArray(course?.testimonials)} />
      }

      <RelatedCourses />
    </> 
  );
};

export default SingleCoursePage;