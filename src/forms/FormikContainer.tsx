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
import { usePanel } from "@/contexts/PanelContext";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const FormikContainer: React.FC<AddCourseType> = (props: AddCourseType) => {
  const { categories, dispatch, statusFormik } = usePanel();

  const [selectedImage, setSelectedImage] = useState<any>([]);

  //----------------------------------------------------
  const navigate = useNavigate();

  //------------------------------formik------prop
  const initialValues: AddCourseType = props;
 
  
  //--------for searchsubmit
  const onSubmit = (
    values: AddCourseType,
    { resetForm, setSubmitting }: FormikHelpers<AddCourseType>
  ) => {
    console.log(values);
    console.log(selectedImage);

    const imagesT: any[] = [];
    const formData = new FormData();

    const category = categories.find(
      (item) => item.name === values.category
    )?.id;
    Array.from(selectedImage).map((file) => {
      console.log(file);
      console.log("test");
      // console.log(file.name);
      formData.append("upload_images", file);
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

    //---------------------------------------------------edit---------------------------------------------
    if (statusFormik === "edit") {
      privateAxios
        .put(`/api/course-list/${props.id}/`, formData)
        .then(() => {
          dispatch({ type: "editCourse", payload: newFormData });
          setSelectedImage([]);
          toast.success('Course edited successfully!')
          navigate("/dashboard/courses");
        })

        .catch((error) => console.log(error));
      //---mishe error hasham inja namayesh dad
    }
    //-----------------------------------------------------------add---------------------------------------
    else {
      privateAxios
      .post("/api/course-list/", formData)
      .then(() => {
        dispatch({ type: "addCourse", payload:newFormData });
        setSelectedImage([]);
        toast.success('Course added successfully!' )
      })

      .catch((error) => console.log(error));
    }

    //------------------------------------------------------------------------------------------------------
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

  //---------------------------------------------
  return (
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
                {statusFormik==="add" && <option>Choose a category</option>}
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
                helperText={Boolean(touched.description) && errors.description}
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
                  Boolean(touched.number_of_chapter) && errors.number_of_chapter
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
               //name="upload_images"
                multiple
                onChange={(event: any) => {
                  setSelectedImage([...event.target.files]);

                  console.log(event.target.files);
                  // setSelectedImage(event.target.files)
                }}
              />
              {
              statusFormik === "add"
                ? selectedImage.length > 0 &&
                  Array.from(selectedImage).map((file) => (
                    <Stack spacing={1} key={file.name}>
                      <Avatar
                        src={URL.createObjectURL(file)}
                        alt="Uploaded image"
                        variant="rounded"
                        sx={{ width: 100, height: 100 }}
                      />
                      <Typography sx={{ textAlign: "center" }}>
                        {file.name}
                      </Typography>
                    </Stack>
                  ))
                : selectedImage.length > 0
                ? Array.from(selectedImage).map((file) => (
                    <Stack spacing={1} key={file.name}>
                      <Avatar
                        src={URL.createObjectURL(file)}
                        alt="Uploaded image"
                        variant="rounded"
                        sx={{ width: 100, height: 100 }}
                      />
                      <Typography sx={{ textAlign: "center" }}>
                        {file.name}
                      </Typography>
                    </Stack>
                  ))
                : Array.from(props.upload_images).map((file) => (
                    <Stack spacing={1} key={file.name}>
                      <Avatar
                        src={file.image}
                        alt="Uploaded image"
                        variant="rounded"
                        sx={{ width: 100, height: 100 }}
                      />
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
                {statusFormik === "add" ? "Add" : "Edit"}
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default FormikContainer;
