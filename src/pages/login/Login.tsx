import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Formik, Form, FormikHelpers, Field } from "formik";
import { publicAxios } from "@/services/publicAxios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

interface RegisterProps {}
const ColorButton = styled(Button)({
  color: "#fff",
  backgroundColor: "#25476a",
  //marginTop: "50px",
  position: "absolute",

  bottom: "-100px",
  right: "-20px",
  width: "100%",
  "&:hover": {
    backgroundColor: "#1f3c5a",
    borderColor: "#1e3955",

    boxShadow:
      "0 0.1rem 0.5rem rgba(37,71,106,.5), 0 0.25rem 1rem rgba(55,60,67,.2)",
  },
});
type FormikValuesType = {
  phone: string;
  password: string;
};


const Login: React.FunctionComponent<RegisterProps> = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate=useNavigate()
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const initialValues: FormikValuesType = {
    phone: "",
    password: "",
   
  };

  
  const onSubmit = (
    values: FormikValuesType,
    { resetForm, setSubmitting }: FormikHelpers<FormikValuesType>
  ) => {
    
    
   
     publicAxios.post("/api/accounts/login/",values)
     .then((res)=>{
        localStorage.setItem("accessToken",res.data.access)
        localStorage.setItem("refreshToken",res.data.refresh)
        }
     )
     .catch(error=>console.log(error))
    //---mishe error hasham inja namayesh dad
    //-------------------------------------------------------

    resetForm();
    setSubmitting(false);
  };

  const validationSchema = Yup.object({
    phone: Yup.string()
    //   .required("شماره تماس الزامی می باشد")
    //   .min(11, "شماره تماس باید ۱۱ رقم باید باشد")
    //   .max(11, "شماره تماس بایذ ۱۱ رقم باید باشد"),
    // password: Yup.string().required("This field is requred"),
    // confirmPassword:  Yup.string().required("تکرار رمز اجباری است")
    // .oneOf([Yup.ref("password")], "با رمز برابر نیست")

    .required("Phone is required")
      .min(11, "Phone should be 11 digit")
      .max(11, "Phone should be 11 digit"),
    password: Yup.string().required("Password is requred").min(6, "Password  should be at least 6 characters"),
    
    
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        //alignItems:"center",
        paddingTop: "80px",
        backgroundColor: "#e8eaf6",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          //alignContent: "center",
          position: "relative",
          width: "300px",
          height: "300px",
          "& > :not(style)": {
            m: 1,
            width: 300,
            height: 400,
          },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            //justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <Typography sx={{ fontWeight: "bold", padding: " 10px 0" }}>
            Login
          </Typography>
          <Typography sx={{ color: "#75868f", fontSize: "12px" }}>
            Sign in to your account
          </Typography>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnMount
            enableReinitialize
          >
            {({ errors, isValid, touched, dirty, values }) => (
              <Box
                
              >
                <Form className="register-form">
                  <Field
                    id="outlined-basic"
                    label="Phone"
                    variant="outlined"
                    size="small"
                    name="phone"
                    as={TextField}
                    error={Boolean(errors.phone) && Boolean(touched.phone)}
                    //  {errors.name?? ${error}}
                    helperText={Boolean(touched.phone) && errors.phone}
                    sx={{
                      label: {
                        fontSize: "14px",
                        "&.MuiFormLabel-root": {
                          fontSize: "14px",
                        },
                      },
                    }}
                  />

                  <Field
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    variant="outlined"
                    size="small"
                    name="password"
                    as={TextField}
                    error={
                      Boolean(errors.password) && Boolean(touched.password)
                    }
                    //  {errors.name?? ${error}}
                    helperText={Boolean(touched.password) && errors.password}
                    sx={{
                      position: "relative",

                      label: {
                        fontSize: "14px",
                        "&.MuiFormLabel-root": {
                          fontSize: "14px",
                        },
                      },
                    }}
                  >
                   
                  </Field>
                

                  <Box>
                    <ColorButton type="submit">LOGIN</ColorButton>
                  </Box>
                </Form>
              </Box>
            )}
          </Formik>

          
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;

