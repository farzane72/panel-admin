import { Stack, Typography } from "@mui/material";
import { usePanel } from "@/contexts/PanelContext";
import { useTranslation } from "react-i18next";
//import ChevronRightIcon from '@mui/icons-material/ChevronRight';
//import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
//import { useLocation } from "react-router-dom";
interface DashboardTextProps {}

const DashboardText: React.FunctionComponent<DashboardTextProps> = () => {
  const {language}=usePanel()
  const {t}= useTranslation()
//   const {hash,pathname,search}=location;
//   console.log(pathname);
//   //let path = pathname;
//   let arr = pathname.split('/');
//   console.log(arr);
// for (let path of arr) {
//  // alert( ` ${path}.` ); // A message to Bilbo  (and other names)
//   console.log(path);
// }
  return (
    <Stack sx={{width:"50%",color:"#fff",pl:`${language==="en"?"18px":0}`,
    pr:`${language==="fa"?"25px":0}` ,mt:"10px",display:{xs:"none",sm:"block"}}} >
      <Typography variant="h4" sx={{pb:"4px"}}>
        {t("dashboard-title")}
       
        </Typography>
      <Typography variant="h5" sx={{pb:"4px"}}> {t("dashboard-summary")}</Typography>
      <Typography  sx={{ fontSize: "16px"}}>
      {t("dashboard-des")}
     
      </Typography>
      {/* <Stack direction="row">
        {
          arr.map((path)=>(
            <Stack direction="row">
                <ChevronLeftIcon />
              <Typography>
                {path}
              </Typography>
            
            </Stack>
          ))
        }
      </Stack> */}
    </ Stack>
  );
};

export default DashboardText;
