import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button  from "@mui/material/Button";


interface LoginProps {}



const ColorButton = styled(Button)({
  color: "#fff",
  backgroundColor: "#25476a",
  marginTop: "50px",
  width:"100%",
  "&:hover": {
    backgroundColor: "#1f3c5a",
    borderColor: "#1e3955",
   
    boxShadow:
      "0 0.1rem 0.5rem rgba(37,71,106,.5), 0 0.25rem 1rem rgba(55,60,67,.2)",
  },
});

const Login: React.FunctionComponent<LoginProps> = () => {
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
          alignContent: "center",

          width: "300px",
          height: "300px",
          "& > :not(style)": {
            m: 1,
            width: 300,
            height: 350,
          },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <Typography sx={{ fontWeight: "bold", padding: " 10px 0" }}>
            Account Login
          </Typography>
          <Typography sx={{color:"#75868f",fontSize:"12px"}}>Sign in to your account</Typography>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "30ch" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px",
              marginTop: "20px",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              size="small"
             // error
             // helperText="Incorrect entry."
              sx={{
                
                label: {
                  fontSize:"14px",
                  "&.MuiFormLabel-root": {
                    fontSize:"14px",
                  },
                },
              }}
            /> 
             <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              size="small"
               sx={{
              //   input: {
              //     color: "red",
              //     "&::placeholder": {
              //       // Set the placeholder color to red
              //       color: "red",
              //     },
              //   },
                label: {
                  //color: "red",
                  fontSize:"14px",
                  "&.MuiFormLabel-root": {
                   // Set the label color to red
                  //  color: "red",
                    fontSize:"14px",
                  },
                },
              }}
            /> 
            <Box >
              <ColorButton>Sign In</ColorButton>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box> 
  );
  
};

export default Login;
