import Stack from "@mui/material/Stack";
import FormikContainer from "@/forms/FormikContainer";
import { AddCourseType } from "@/types/PanelTypes";
import { LoaderFunctionArgs } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { privateAxios } from "@/services/privateAxios";

const EditCourse = () => {

  const course = useLoaderData() as  AddCourseType;
  console.log(course);

    const newCourse={
      id: course.id,
      title: course.title,
      teacher:course.teacher,
      price:course.price,
      duration: course.duration,
      images:[],
      category: course.category,
      description: course.description,
      number_of_chapter: course.number_of_chapter,
      number_of_viewer: course.number_of_viewer,
      upload_images: course.images,
    };
  return (
    <Stack
      sx={{ marginRight: "30px", marginLeft: "30px", paddingTop: "-20px" }}
    >
      <FormikContainer {...newCourse} />
    </Stack>
  );
};

export async function loader( {params }: LoaderFunctionArgs) {
    const course =await privateAxios.get(`/api/course-list/${params.courseId}/`)
        
    return course.data;
  }
  

export default EditCourse;
