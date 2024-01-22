import { useNavigate, useRouteError } from 'react-router-dom';
import { usePanel } from '@/contexts/PanelContext';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


type ErrorType={
  data?:string,
  message?:string,
}
function NotFound() {
  const navigate = useNavigate();
  const error=useRouteError() as ErrorType;
  console.log(error);
  const {language}=usePanel()
  

  return (
   

    <Stack sx={{padding:"20px"}} spacing={2} >
      <Typography sx={{textAlign:"center"}}>
        {language==="en"?"Something went wrong":"خطایی رخ داده است."} 😢
        </Typography>
        <Typography > {language==="en"?"error message:":"متن ارور:"} </Typography>
       <Typography sx={{textAlign:"center"}}> {error.data||error.message} </Typography>
       <Button onClick={() => navigate(-1)}>&larr; {language==="en"?"Go Back:": "برگشت"}</Button>
      </Stack>
  );
}

export default NotFound;
