import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Formik, Form, FormikHelpers, Field } from "formik";
import * as Yup from "yup";
import { privateAxios } from "@/services/privateAxios";
import { AddCategoryType } from "@/types/PanelTypes";
import { usePanel } from "@/contexts/PanelContext";

const EditCategory = () => {
  const {dispatch}=usePanel()
  const [selectedImage, setSelectedImage] = useState<any>("");

  
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
     console.log(formData);
     privateAxios.post("/api/course-category/", formData).then(() => {
     
      dispatch({type:"addCategory",payload:formData})
    })
    
    .catch(error=>console.log(error))
    //-------------------------------------------------------

    resetForm();
    setSubmitting(false);
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required"),
   
  });

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
                  alt="Uploaded image"
                  variant="rounded"
                  sx={{ width: 100, height: 100 }}
                />
               
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

export default  EditCategory;


