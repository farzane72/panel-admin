import Stack from "@mui/material/Stack";
import FormikContainer from "@/forms/FormikContainer";
import { AddCourseType } from "@/types/PanelTypes";
//import { useLocation } from "react-router-dom";
//import { usePanel } from "@/contexts/PanelContext";

const course: AddCourseType = {
    id: 0,
    title: "",
    teacher: "",
    price: "",
    duration: "",
    images: [],
    category: "",
    description: "",
    number_of_chapter: "",
    number_of_viewer: "",
    upload_images: [],
  };
 
const AddCourse = () => {
  //const{statusFormik,dispatch}=usePanel()
  //const location=useLocation()
 // const {hash,pathname,search}=location;
  //console.log(pathname);
  //if(pathname==="/dashboard/addcourse"){
   // dispatch({type:"statusFormik",payload:"add"})
  //}


    return (
        <Stack
            sx={{ marginRight: "30px", marginLeft: "30px", paddingTop: "-20px" }}>

                <FormikContainer  {...course} />

        </Stack>

      );
}
 
export default AddCourse;