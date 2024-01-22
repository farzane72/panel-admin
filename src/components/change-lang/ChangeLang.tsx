import InputLabel from "@mui/material/InputLabel";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { usePanel } from "@/contexts/PanelContext";
import Avatar from "@mui/material/Avatar";
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useTranslation } from "react-i18next";

interface ChangeLangProps {}

const ChangeLang: React.FunctionComponent<ChangeLangProps> = () => {
  const { language, changeLanguage,mode } = usePanel();
  const {t}=useTranslation()
  const BootstrapInput = styled(InputBase)(({ theme }) => ({
   
     'label + &': {
      
       marginTop: theme.spacing(1),
       textAlign:"right"
    //  color:"warning"
     },
  
    '& .MuiInputBase-input': {
     // color:"#fff",
      backgroundColor:"none",
      borderRadius: 4,
      position: 'relative',
      //backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }));


  return (
   
    <FormControl sx={{ m: 1, minWidth: 120,direction:"ltr"  }} size="small"   >
      <InputLabel id="demo-select-small-label"  >{t("header.language")}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={language}
       
        label="Language"
       input={<BootstrapInput />}
        //color="ochre"
        // sx={{
        //   label: {
        //    // color:`${mode==="dark"?"#fff":"#25476a"}` ,
        //     textAlign:`${language==="fa"?"right":"left"}`,
        //     right:`${language==="fa"&&0}`,
        //     "&.MuiFormLabel-root": {
        //      // color:`${mode==="dark"?"#fff":"#25476a"}` ,
        //       transformOrigin:`${language==="fa"?"top right":"top  left"}`,
        //       textAlign:`${language==="fa"?"right":"left"}`,
        //     },
        //   },
        //     "& .MuiOutlinedInput-root fieldset": {
        //       textAlign:`${language==="fa"?"right":"left"}`,
        //     },
         
            
        // }}
      
        onChange={changeLanguage}
      >
        <MenuItem value="fa">
          <Avatar
           
            src=".././src/assets/images/f-Iran.png"
            sx={{ width: 24, height: 24 }}
          />
        </MenuItem>
        <MenuItem value="en">
          <Avatar
            
            src=".././src/assets/images/f-En.png"
            sx={{ width: 24, height: 24 }}
          />
        </MenuItem>
      </Select>
    </FormControl>
   
  );
};

export default ChangeLang;
