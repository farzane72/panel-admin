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
import { useTranslation } from "react-i18next";



const FormikContainer: React.FC<AddCourseType> = (props: AddCourseType) => {
  const { categories, dispatch, statusFormik } = usePanel();

  const [selectedImage, setSelectedImage] = useState<any>([]);
  const {mode,language}=usePanel()
  //----------------------------------------------------
  const navigate = useNavigate();
  const {t}=useTranslation("courses")
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
         
          toast.success(`${language === "en" ? "Course edited successfully!" : "دوره با موفقیت ویرایش شد"}` )
          navigate("/dashboard/courses");
        })

        .catch((error) => console.log(error));
      
    }
    //-----------------------------------------------------------add---------------------------------------
    else {
      privateAxios
      .post("/api/course-list/", formData)
      .then(() => {
        dispatch({ type: "addCourse", payload:newFormData });
        setSelectedImage([]);
       // toast.success('Course added successfully!' )
        toast.success(`${language === "en" ? "Course added successfully!" : "دوره جدید با موفقیت اضافه شد"}` )
      })

      .catch((error) => console.log(error));
    }

    //------------------------------------------------------------------------------------------------------
    resetForm();
    setSubmitting(false);
  };

  const validationSchema = Yup.object({
    title: Yup.string().required(`${t("error-title")}`),
    price: Yup.number().required(`${t("error-price")}`),
    teacher: Yup.string().required(`${t("error-teacher")}`),
    duration: Yup.number().required(`${t("error-duration")}`),
    // category: Yup.string().required("Category is required"),
    description: Yup.string().required(`${t("error-description")}`),
    number_of_chapter: Yup.number().required(`${t("error-numer-of-chapter")}`),
    number_of_viewer: Yup.number().required(`${t("error-number-of-viewer")}`),
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
        <Form className="" >
          <Grid container sx={{ my: "40px",  }} spacing={2}>
            <Grid item xs={12} md={6}>
              <Field
                id="filled-basic"
                label={t("title")}
                variant="standard"
                fullWidth
                name="title"
                as={TextField}
                error={Boolean(errors.title) && Boolean(touched.title)}
                //  {errors.name?? ${error}}
                helperText={Boolean(touched.title) && errors.title}
               
              
                sx={{
                  label: {
                    color:`${mode==="dark"?"#fff":"#25476a"}` ,
                    textAlign:`${language==="fa"?"right":"left"}`,
                    right:`${language==="fa"&&0}`,
                    "&.MuiFormLabel-root": {
                      color:`${mode==="dark"?"#fff":"#25476a"}` ,
                      transformOrigin:`${language==="fa"?"top right":"top  left"}`,
                    },
                  },
                    '& .MuiFormHelperText-root.Mui-error': {
                        textAlign:`${language==="fa"?"right":"left"}`
                     },
                }}
              />
              
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Field
                id="filled-basic"
                label={t("teacher")}
                variant="standard"
                fullWidth
                name="teacher"
                as={TextField}
                error={Boolean(errors.teacher) && Boolean(touched.teacher)}
                helperText={Boolean(touched.teacher) && errors.teacher}
                sx={{
                  label: {
                    color:`${mode==="dark"?"#fff":"#25476a"}` ,
                    textAlign:`${language==="fa"?"right":"left"}`,
                    right:`${language==="fa"&&0}`,
                    "&.MuiFormLabel-root": {
                      color:`${mode==="dark"?"#fff":"#25476a"}` ,
                      transformOrigin:`${language==="fa"?"top right":"top  left"}`,
                    },
                  },
                    '& .MuiFormHelperText-root.Mui-error': {
                        textAlign:`${language==="fa"?"right":"left"}`
                     },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                id="filled-basic"
                label={t("price")}
                variant="standard"
                fullWidth
                name="price"
                as={TextField}
                error={Boolean(errors.price) && Boolean(touched.price)}
                helperText={Boolean(touched.price) && errors.price}
                sx={{
                  label: {
                    color:`${mode==="dark"?"#fff":"#25476a"}` ,
                    textAlign:`${language==="fa"?"right":"left"}`,
                    right:`${language==="fa"&&0}`,
                    "&.MuiFormLabel-root": {
                      color:`${mode==="dark"?"#fff":"#25476a"}` ,
                      transformOrigin:`${language==="fa"?"top right":"top  left"}`,
                    },
                  },
                    '& .MuiFormHelperText-root.Mui-error': {
                        textAlign:`${language==="fa"?"right":"left"}`
                     },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                id="standard-select-currency"
                //select
                label={t("choose")}
                placeholder="Select"
                name="category"
                as="select"
                className="select-form"
               
                sx={{
                  label: {
                    color:`${mode==="dark"?"#fff":"#25476a"}` ,
                    "&.MuiFormLabel-root": {
                      color:`${mode==="dark"?"#fff":"#25476a"}` ,
                    },
                  },
                }}
              >
                {statusFormik==="add" && <option>{t("choose")}</option>}
                
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
                label={t("duration")}
                variant="standard"
                fullWidth
                name="duration"
                as={TextField}
                error={Boolean(errors.duration) && Boolean(touched.duration)}
                helperText={Boolean(touched.duration) && errors.duration}
                sx={{
                  label: {
                    color:`${mode==="dark"?"#fff":"#25476a"}` ,
                    textAlign:`${language==="fa"?"right":"left"}`,
                    right:`${language==="fa"&&0}`,
                    "&.MuiFormLabel-root": {
                      color:`${mode==="dark"?"#fff":"#25476a"}` ,
                      transformOrigin:`${language==="fa"?"top right":"top  left"}`,
                    },
                  },
                    '& .MuiFormHelperText-root.Mui-error': {
                        textAlign:`${language==="fa"?"right":"left"}`
                     },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Field
                id="filled-basic"
                label={t("description")}
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
                    color:`${mode==="dark"?"#fff":"#25476a"}` ,
                    textAlign:`${language==="fa"?"right":"left"}`,
                    right:`${language==="fa"&&0}`,
                    "&.MuiFormLabel-root": {
                      color:`${mode==="dark"?"#fff":"#25476a"}` ,
                      transformOrigin:`${language==="fa"?"top right":"top  left"}`,
                    },
                  },
                    '& .MuiFormHelperText-root.Mui-error': {
                        textAlign:`${language==="fa"?"right":"left"}`
                     },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                id="filled-basic"
                label={t("number-of-viewer")}
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
                    color:`${mode==="dark"?"#fff":"#25476a"}` ,
                    textAlign:`${language==="fa"?"right":"left"}`,
                    right:`${language==="fa"&&0}`,
                    "&.MuiFormLabel-root": {
                      color:`${mode==="dark"?"#fff":"#25476a"}` ,
                      transformOrigin:`${language==="fa"?"top right":"top  left"}`,
                    },
                  },
                    '& .MuiFormHelperText-root.Mui-error': {
                        textAlign:`${language==="fa"?"right":"left"}`
                     },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                id="filled-basic"
                label={t("number-of-chapter")}
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
                    color:`${mode==="dark"?"#fff":"#25476a"}` ,
                    textAlign:`${language==="fa"?"right":"left"}`,
                    right:`${language==="fa"&&0}`,
                    "&.MuiFormLabel-root": {
                      color:`${mode==="dark"?"#fff":"#25476a"}` ,
                      transformOrigin:`${language==="fa"?"top right":"top  left"}`,
                    },
                  },
                    '& .MuiFormHelperText-root.Mui-error': {
                        textAlign:`${language==="fa"?"right":"left"}`
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
                
                type="file"
                name="images"
                multiple
                onChange={(event: any) => {
                  setSelectedImage([...event.target.files]);
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
                sx={{ bgcolor: "#25476a", ":hover": { bgcolor: "#25476a" } ,color:"#fff"}}
              >
                {statusFormik === "add" ? `${t("add")}` : `${t("edit")}`}
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default FormikContainer;

