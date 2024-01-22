import Grid from "@mui/material/Grid";
import {  Field,useFormikContext } from "formik";
import { usePanel } from "@/contexts/PanelContext";
import TextField from "@mui/material/TextField";

interface InputProps {
    inputName:string
    label:string
    // errors:any,
    // touched:any
    
}

 
const Input:React.FunctionComponent<InputProps> = (props:InputProps) => {
    const{ inputName,label}=props
    
    const {mode,language}=usePanel()

    const {errors,touched}=useFormikContext<InputProps>()
    return (
        <Grid item xs={12} md={6}>
        <Field
          id="filled-basic"
          label={label}
          variant="standard"
          fullWidth
          name={inputName}
          as={TextField}
          error={Boolean(errors.inputName) && Boolean(touched.inputName)}
          //  {errors.name?? ${error}}
          helperText={Boolean(touched.inputName) && errors.inputName}
         
        
          sx={{
            label: {
             
              color:`${mode==="dark"?"#fff":"#25476a"}` ,
              textAlign:`${language==="fa"?"right":"left"}`,
              right:`${language==="fa"&&0}`,
              "&.MuiFormLabel-root": {
                
                color:`${mode==="dark"?"#fff":"#25476a"}` ,
                transformOrigin: "top right",
                
              },
              '&:focus-within': {
                // position: 'absolute',
                // top: '-10px',
                // left: '-50px',
                // transformOrigin: "top right"
              },
            },
              '& .MuiFormHelperText-root.Mui-error': {
                
                 textAlign:"right"
               
               },
           
          }}
        />
        
      </Grid>
      );
}
 
export default Input;