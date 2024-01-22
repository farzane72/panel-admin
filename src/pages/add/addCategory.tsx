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
import { useTranslation } from "react-i18next";
import toast from 'react-hot-toast';

const AddCategory = () => {
  const {dispatch,mode,language}=usePanel()
  const {t}=useTranslation("categories")
  
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
    
    const formData = new FormData();
     formData.append("image", selectedImage);
     formData.append("name", values.name);
     privateAxios.post("/api/course-category/", formData).then(() => {
     
      dispatch({type:"addCategory",payload:formData})
      setSelectedImage([]);
       
      toast.success(`${language === "en" ? "Category added successfully!" : "دسته جدید با موفقیت اضافه شد"}` )
    })
    
    .catch(error=>console.log(error))
  
    //-------------------------------------------------------

    resetForm();
    setSubmitting(false);
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required(`${t("error-name")}`),
   
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
                  label={t("name")}
                  variant="standard"
                  fullWidth
                  name="name"
                  as={TextField}
                  error={Boolean(errors.name) && Boolean(touched.name)}
                  helperText={Boolean(touched.name) && errors.name}
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
               
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingY:"30px"
              }}
            >
              <Box
                sx={{
                 
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
               {
                selectedImage&&
                <Avatar
                  src={URL.createObjectURL(selectedImage)}
                  alt="Uploaded image"
                  variant="rounded"
                  sx={{ width: 100, height: 100 }}
                />
               }
                
               
              </Box>
              <Box>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ bgcolor: "#25476a", ":hover": { bgcolor: "#25476a" ,},color:"#fff" }}
                >
                  {t("add")}
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


