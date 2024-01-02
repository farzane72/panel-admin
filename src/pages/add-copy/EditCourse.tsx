import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Formik, Form, FormikHelpers, Field } from "formik";
import * as Yup from "yup";
import { AddCourseType } from "@/types/PanelTypes";
import { privateAxios } from "@/services/privateAxios";
import { ImageType, OptionTypes } from "@/types/PanelTypes";
import { usePanel } from "@/contexts/PanelContext";
import Typography from "@mui/material/Typography";
import { LoaderFunctionArgs } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditCourse = () => {
  const { categories, dispatch } = usePanel();

  //const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<any>([]);
  const [imageUrl, setImageUrl] = useState<string>("");

  //----------------------------------------------------
  const navigate=useNavigate()
  const course = useLoaderData() as  AddCourseType;
  console.log(course);
  //group:groups.find(item=>item.id === contact.group)?.name||"",
  //------------------------------formik------
  const initialValues: AddCourseType = {
    id: course.id,
    title: course.title,
    teacher:course.teacher,
    price:course.price,
    duration: course.duration,
    images: [],
    category: course.category,
    description: course.description,
    number_of_chapter: course.number_of_chapter,
    number_of_viewer: course.number_of_viewer,
    upload_images: course.images,
  };
  //--------for searchsubmit
  const onSubmit = (
    values: AddCourseType,
    { resetForm, setSubmitting }: FormikHelpers<AddCourseType>
  ) => {
    console.log(values);
    console.log(selectedImage);
    
    const imagesT: any[] = [];
    const formData = new FormData();
    
    const category= categories.find(item=>item.name === values.category )?.id
    Array.from(selectedImage).map((file) => {
      console.log(file);
      console.log("test");
      // console.log(file.name);
      formData.append("upload_images",file);
      imagesT.push(file);
    });
    

    formData.append("title", values.title);
    formData.append("teacher", values.teacher);
    formData.append("price", values.price);
    formData.append("duration", values.duration);
    formData.append("description", values.description);
    formData.append("category", category);
    formData.append("number_of_chapter", values.number_of_chapter);
    formData.append("number_of_viewer", values.number_of_viewer);
    console.log("data form");
    const newFormData = { ...formData, images: imagesT };
    console.log(formData);
    privateAxios
      .put(`/api/course-list/${course.id}/`, formData)
      .then(() => {
        dispatch({ type: "editCourse", payload:newFormData });
        setSelectedImage([]);
        navigate('/dashboard/courses')
      })

      .catch((error) => console.log(error));
    //---mishe error hasham inja namayesh dad
    //-------------------------------------------------------

    resetForm();
    setSubmitting(false);
  };
 
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    price: Yup.number().required("Price is required"),
    teacher: Yup.string().required("Teacher is required"),
   duration: Yup.number().required("Duration is required"),
   // category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
    number_of_chapter: Yup.number().required("Number_of_chapter is required"),
    number_of_viewer: Yup.number().required("Number_of_viewer is required"),
  });

  //------------------------------------------
  // const options: OptionTypes = [
  //   { key: "انتخاب دسته بندی", value: "" },
  //   { key: "فرانت اند", value: "فرانت اند" },
  //   { key: "بک اند", value: "بک اند" },
  //   { key: "فول استک", value: "فول استک" },
  //   { key: "شبکه", value: "شبکه" },
  //   { key: "گرافیک", value: "گرافیک" },
  // ];

  const options: OptionTypes = [
    { key: "Choose category", value: "" },
    { key: "Front-end", value: "Front-end" },
    { key: "Back-end", value: "Back-end" },
    { key: "FullStack", value: "FullStack" },
    { key: "Network", value: "Network" },
    //{ key: "گرافیک", value: "گرافیک" },
  ];
  //------------------------------------------

  //---------------------------------------------
  return (
    <Stack
      sx={{ marginRight: "30px", marginLeft: "30px", paddingTop: "-20px" }}
      
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnMount
        enableReinitialize
      >
        {({ errors, isValid, touched, dirty, values }) => (
          <Form className="">
            <Grid container sx={{ my: "40px" }} spacing={2}>
              <Grid item xs={12} md={6}>
                <Field
                  id="filled-basic"
                  label="Title"
                  variant="standard"
                  fullWidth
                  name="title"
                  as={TextField}
                  error={Boolean(errors.title) && Boolean(touched.title)}
                  //  {errors.name?? ${error}}
                  helperText={Boolean(touched.title) && errors.title}
                  sx={{
                    label: {
                      // fontSize:"16px",
                      color: "#25476a",
                      "&.MuiFormLabel-root": {
                        // fontSize:"14px",
                        color: "#25476a",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  id="filled-basic"
                  label="Teacher"
                  variant="standard"
                  fullWidth
                  name="teacher"
                  as={TextField}
                  error={Boolean(errors.teacher) && Boolean(touched.teacher)}
                  helperText={Boolean(touched.teacher) && errors.teacher}
                  sx={{
                    label: {
                      color: "#25476a",
                      "&.MuiFormLabel-root": {
                        color: "#25476a",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  id="filled-basic"
                  label="Price"
                  variant="standard"
                  fullWidth
                  name="price"
                  as={TextField}
                  error={Boolean(errors.price) && Boolean(touched.price)}
                  helperText={Boolean(touched.price) && errors.price}
                  sx={{
                    label: {
                      color: "#25476a",
                      "&.MuiFormLabel-root": {
                        color: "#25476a",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  id="standard-select-currency"
                  //select
                  label="Select"
                  placeholder="Select"
                  name="category"
                  as="select"
                  className="select-form"
                 // error={Boolean(errors.category) && Boolean(touched.category)}
                 // helperText={Boolean(touched.category) && errors.category}
                  sx={{
                    label: {
                      color: "#25476a",
                      "&.MuiFormLabel-root": {
                        color: "#25476a",
                      },
                    },
                  }}
                >
                 
                 {/* <option>Choose a category</option>  */}
                 {/* <option>{course.category}</option>  */}
                  {categories.map((option) => {
                    return (
                      <option key={option.id} value={option.name}>
                        {option.name}
                      </option>
                    );
                  })}
                </Field>
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  id="filled-basic"
                  label="Duration"
                  variant="standard"
                  fullWidth
                  name="duration"
                  as={TextField}
                  error={Boolean(errors.duration) && Boolean(touched.duration)}
                  helperText={Boolean(touched.duration) && errors.duration}
                  sx={{
                    label: {
                      color: "#25476a",
                      "&.MuiFormLabel-root": {
                        color: "#25476a",
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Field
                  id="filled-basic"
                  label="Description"
                  variant="standard"
                  fullWidth
                  name="description"
                  as={TextField}
                  error={
                    Boolean(errors.description) && Boolean(touched.description)
                  }
                  helperText={
                    Boolean(touched.description) && errors.description
                  }
                  sx={{
                    label: {
                      color: "#25476a",
                      "&.MuiFormLabel-root": {
                        color: "#25476a",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  id="filled-basic"
                  label="Number of viewer"
                  variant="standard"
                  fullWidth
                  name="number_of_viewer"
                  as={TextField}
                  error={
                    Boolean(errors.number_of_viewer) &&
                    Boolean(touched.number_of_viewer)
                  }
                  helperText={
                    Boolean(touched.number_of_viewer) && errors.number_of_viewer
                  }
                  sx={{
                    label: {
                      color: "#25476a",
                      "&.MuiFormLabel-root": {
                        color: "#25476a",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  id="filled-basic"
                  label="Number of chapter"
                  variant="standard"
                  fullWidth
                  name="number_of_chapter"
                  as={TextField}
                  error={
                    Boolean(errors.number_of_chapter) &&
                    Boolean(touched.number_of_chapter)
                  }
                  helperText={
                    Boolean(touched.number_of_chapter) &&
                    errors.number_of_chapter
                  }
                  sx={{
                    label: {
                      color: "#25476a",
                      "&.MuiFormLabel-root": {
                        color: "#25476a",
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                paddingTop: "30px",
                paddingBottom: "30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  // paddingTop: "30px",
                  display: "flex",
                  gap: "30px",
                  alignItems: "center",
                }}
              >
                <Field
                  // as={TextField}
                  type="file"
                  name="images"
                  multiple
                  onChange={(event: any) => {
                    setSelectedImage ([...event.target.files]);
                   
                    console.log(event.target.files);
                   // setSelectedImage(event.target.files)
                    }
                  }
                />
                {
                selectedImage.length>0 ?
                  Array.from(selectedImage).map((file) => (
                    <Stack spacing={1} key={file.name}>
                      <Avatar
                        // src={imageUrl}
                        src={URL.createObjectURL(file)}
                        alt="Uploaded image"
                        variant="rounded"
                        sx={{ width: 100, height: 100 }}
                      />
                      <Typography sx={{ textAlign: "center" }}>
                        {file.name}
                      </Typography>
                    </Stack>
                  )):
                  Array.from(course.images).map((file) => (
                    <Stack spacing={1} key={file.name}>
                      <Avatar
                        // src={imageUrl}
                        src={file.image}
                        alt="Uploaded image"
                        variant="rounded"
                        sx={{ width: 100, height: 100 }}
                      />
                      {/* <Typography sx={{ textAlign: "center" }}>
                        {file.name}
                      </Typography> */}
                    </Stack>
                  ))
                  }

                
              </Box>
              <Box>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ bgcolor: "#25476a", ":hover": { bgcolor: "#25476a" } }}
                >
                  Edit
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
export async function loader( {params }: LoaderFunctionArgs) {
  const course =await privateAxios.get(`/api/course-list/${params.courseId}/`)
      
  return course.data;
}

export default EditCourse;

//"image": "http://mohammadrezagh80.pythonanywhere.com/media/course/course_image/1_EwRDPeb.png",

//src={URL.createObjectURL(selectedImage)}   avatar
// const handleUploadTest = async (event: any) => {
//   if (!selectedImage) {
//     return;
//   }

//   try {
//     // const formData = new FormData();
//     // formData.append("image", selectedImage);
//     // const res = await axios.post( `${Base_Url}/${endPoint}`,data)
//     // const imageName=selectedImage.name
//     // console.log(imageName);
//     // const response = await publicAxios.post(`/media/course/course_image/`,{ image: imageName});

//     // console.log("test"+response);
//     //   if (response.ok) {
//     //     const data = await response.json();
//     //     setImageUrl(data.url);
//     //   }

//     const formData = new FormData();
//     console.log(selectedImage);
//     formData.append("image", selectedImage);

//     publicAxios
//       .post(`/media/course/course_image/`, formData)
//       .then((res) => console.log(res));

//     // if (response.ok) {
//     //        const data = await response.json();
//     //        setImageUrl(data.url);
//     //     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// const handleUpload = () => {
//   // Send the selected image file to the server using an HTTP POST request
//   console.log(selectedImage);
// };
 //   .required("شماره تماس الزامی می باشد")
  //   .min(11, "شماره تماس باید ۱۱ رقم باید باشد")
  //   .max(11, "شماره تماس بایذ ۱۱ رقم باید باشد"),
  // password: Yup.string().required("This field is requred"),
  // confirmPassword:  Yup.string().required("تکرار رمز اجباری است")
  // .oneOf([Yup.ref("password")], "با رمز برابر نیست")