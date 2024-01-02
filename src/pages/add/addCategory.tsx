import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
//import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
//import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Formik, Form, FormikHelpers, Field } from "formik";
import * as Yup from "yup";
//import { AddCourseType } from "@/types/PanelTypes";
import { publicAxios } from "@/services/publicAxios";
import { privateAxios } from "@/services/privateAxios";
import { ImageType, OptionTypes,AddCategoryType } from "@/types/PanelTypes";
//import MenuItem from '@mui/material/MenuItem';
import { usePanel } from "@/contexts/PanelContext";

const AddCategory = () => {
  const {categories,dispatch}=usePanel()
  
  
  const [selectedImage, setSelectedImage] = useState<any>("");
  const [imageUrl, setImageUrl] = useState<string>("");
 // console.log(selectedImage);
  const handleUploadTest = async (event: any) => {
    if (!selectedImage) {
      return;
    }

    try {
      
      const formData = new FormData();
      console.log(selectedImage);
      formData.append("image", selectedImage);

      publicAxios
        .post(`/media/course/course_image/`, formData)
        .then((res) => console.log(res));

      // if (response.ok) {
      //        const data = await response.json();
      //        setImageUrl(data.url);
      //     }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = () => {
    // Send the selected image file to the server using an HTTP POST request
    console.log(selectedImage);
  };

  //------------------------------formik------
  const initialValues:AddCategoryType = {
    //id?: "",
    name: "",
    image: ""
    
  };

  const onSubmit = (
    values:  AddCategoryType,
    { resetForm, setSubmitting }: FormikHelpers< AddCategoryType>
    
  ) => {
    console.log(values.name);
    
   
   console.log(selectedImage);
    const formData = new FormData();
     formData.append("image", selectedImage);
     formData.append("name", values.name);
    
     //console.log("object");
     console.log(formData);
     privateAxios.post("/api/course-category/", formData).then(() => {
     
      dispatch({type:"addCategory",payload:formData})
    })
    
    .catch(error=>console.log(error))
  //  ---mishe error hasham inja namayesh dad
    //-------------------------------------------------------

    resetForm();
    setSubmitting(false);
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      //   .required("شماره تماس الزامی می باشد")
      //   .min(11, "شماره تماس باید ۱۱ رقم باید باشد")
      //   .max(11, "شماره تماس بایذ ۱۱ رقم باید باشد"),
      // password: Yup.string().required("This field is requred"),
      // confirmPassword:  Yup.string().required("تکرار رمز اجباری است")
      // .oneOf([Yup.ref("password")], "با رمز برابر نیست")

      .required("Name is required"),
    //image: Yup.string().required("Image is required"),
   
  });

  //---------------------------------------------
  return (
    <Stack
      sx={{ marginRight: "30px", marginLeft: "30px", paddingTop: "-20px" }}
      // direction={"column"}
      // spacing={2}
      //component="form"
      // noValidate
      //autoComplete="off"
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
              <Grid item xs={12} md={6} >
                <Field
                  id="filled-basic"
                  label="Name"
                  variant="standard"
                  fullWidth
                  name="name"
                  as={TextField}
                  error={Boolean(errors.name) && Boolean(touched.name)}
                  //  {errors.name?? ${error}}
                  helperText={Boolean(touched.name) && errors.name}
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
              
            </Grid>
            <Box
              sx={{
               // paddingTop: "30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingY:"30px"
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
                  name="image"
                  
                  onChange={(event: any) => {
                    
                    setSelectedImage(event.target.files[0]);
                  }}
                />
               
                <Avatar
                  // src={imageUrl}
                  // src={URL.createObjectURL(selectedImage)}
                  alt="Uploaded image"
                  variant="rounded"
                  sx={{ width: 100, height: 100 }}
                />
                {/* )} */}
              </Box>
              <Box>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ bgcolor: "#25476a", ":hover": { bgcolor: "#25476a" } }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>

      
    </Stack>
  );
};

export default  AddCategory;


