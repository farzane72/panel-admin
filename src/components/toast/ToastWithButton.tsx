import toast from "react-hot-toast";
import { privateAxios } from "@/services/privateAxios";
import { usePanel } from "@/contexts/PanelContext";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { styled } from "@mui/material/styles";


interface ToastWithButtonProps {
  id: number | string;
  title: string;
  question: string;
  type:string
 
}
const BoxIcon = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  //alignContent:"center",
  alignItems: "center",
  // padding: "10px 10px",
  
  borderRadius: "5px",
  backgroundColor: "#e7ecf3",
  color: "#373c43",
  width: "30px",
  height: "30px",
  ":hover ": {
    color: "#373c43",
    backgroundColor: "#e6ebf2",
    borderColor: "#e4e9f2",
    boxShadow:
      " 0 0.1rem 0.5rem rgba(225,231,240,.5), 0 0.25rem 1rem rgba(55,60,67,.2)",
  },
}));


const ToastWithButton: React.FunctionComponent<ToastWithButtonProps> = (props) => {
  const { id, title, question,type } = props;
  const { dispatch,language,mode } = usePanel();

 
  //-----------------------------------------------------------------------------------------------------
  function callback(id: number | string,title:string) {
    
    toast((t) => (
      <Stack spacing={2} sx={{padding:"10px"}}>
        <Typography  sx={{fontSize:"18px",textAlign:"center",color:"yellow"}}>
          {title}
        </Typography>
        <span>{question}</span>
        <Box sx={{dispaly:"flex",justifyContent:"center",alignContent:"center",gap:"5px"}}>
          <Button
            variant="contained"
            onClick={() => {
              if(type==="course"){
                privateAxios
                .delete(`/api/course-list/${id}/`)
                .then(() => dispatch({ type: "deleteCourse", payload: id }));

              }
              if(type==="category"){
                privateAxios
                .delete(`/api/course-category/${id}/`)
                .then(() => dispatch({ type: "deleteCategory", payload: id }));
              }
              if(type==="search"){
                privateAxios
                .delete(`/api/course-list/${id}/`)
                .then(() => dispatch({ type: "deleteSearch", payload: id }));

              }
             
              
              toast.dismiss(t.id);
            }}
            sx={{ bgcolor: "#25476a",marginRight:`${language==="fa"?0:"5px"}`,marginLeft:`${language==="fa"?"5px":0}`, ":hover": { bgcolor: "#25476a", },color:"#fff" }}
          >
            {language==="en"?"I'm Sure":"مطمئن هستم"}
          </Button>
         
          <Button
            variant="contained"
            onClick={() => toast.dismiss(t.id)}
            sx={{ bgcolor: "#25476a", ":hover": { bgcolor: "#25476a" },color:"#fff" }}
           
          >
            {language==="en"?"Cancel":"انصراف"}
            
          </Button>
          
        </Box>
      </Stack>
    ));
  
  
  }


  //----------------------------------------------------------------------------------------------------
  


  return(

    <BoxIcon 
    //  sx={{marginRight:`${language==="fa"?"8px":"0"}`}}
     onClick={() => callback(id,title)
                 
    }>
      <DeleteOutlineOutlinedIcon
        sx={{ width: "20px", height: "20px" }}
      />
    </BoxIcon>

  )
  
 
};

export default ToastWithButton;

