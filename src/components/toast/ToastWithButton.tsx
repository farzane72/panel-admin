import toast from "react-hot-toast";
import { privateAxios } from "@/services/privateAxios";
import { usePanel } from "@/contexts/PanelContext";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { styled } from "@mui/material/styles";
interface ToastWithButtonProps {
  id: number | string;
  title: string;
  question: string;
 
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
  const { id, title, question } = props;
  const { dispatch } = usePanel();
  //-----------------------------------------------------------------------------------------------------
  function callback(id: number | string,title:string) {
    console.log("hello");
    toast((t) => (
      <Stack spacing={2} sx={{padding:"10px"}}>
        <Typography  sx={{fontSize:"18px",textAlign:"center",color:"yellow"}}>
          {title}
        </Typography>
        <span>{question}</span>
        <Box sx={{dispaly:"flex",justifyContent:"center",alignContent:"center"}}>
          <Button
            variant="contained"
            onClick={() => {
              privateAxios
                .delete(`/api/course-list/${id}/`)
                .then(() => dispatch({ type: "deleteCourse", payload: id }));
              
              toast.dismiss(t.id);
            }}
            sx={{ bgcolor: "#25476a",marginRight:"5px", ":hover": { bgcolor: "#25476a" } }}
          >
            I'm Sure
          </Button>
         
          <Button
            variant="contained"
            onClick={() => toast.dismiss(t.id)}
            sx={{ bgcolor: "#25476a", ":hover": { bgcolor: "#25476a" } }}
          >
            Cancel
          </Button>
          
        </Box>
      </Stack>
    ));
  
  
  }
  //----------------------------------------------------------------------------------------------------
  
  return(

    <BoxIcon onClick={() => callback(id,title)
                 
    }>
      <DeleteOutlineOutlinedIcon
        sx={{ width: "20px", height: "20px" }}
      />
    </BoxIcon>

  )
  
 
};

export default ToastWithButton;

