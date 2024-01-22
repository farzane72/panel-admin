import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "./App.css";
import "@/assets/styles/fonts.css"
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Stack from "@mui/material/Stack";
//import yekanbakh from "@/assets/fonts/Yekan-bakh/YEKANBAKHFANUM-MEDIUM.TTF"
//import "@/assets/fonts/Yekan-bakh/YEKANBAKHFANUM-MEDIUM.TTF"


const theme = createTheme({
  typography: {
    //fontFamily: ["Chilanka", "cursive"].join(","),
   fontFamily:  ['yekanbakh', 'system-ui', 'sans-serif'].join(",")
   // fontFamily:['Vazirmatn' ,'sans-serif'].join(",")
  },
  components: {
    MuiCssBaseline: {
      // styleOverrides: `
      //   @font-face {
      //     font-family: 'yekanbakh';
      //     font-style: normal;
      //     font-display: swap;
      //     font-weight: 400;
      //     src: local('yekanbakh'), local('yekanbakh-Regular'), url(${yekanbakh}) format("ttf");
      //     unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
      //   }
      // `,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack   sx={{fontFamily: 'yekanbakh'}}>
        <App />
      </Stack>
        
    </ThemeProvider>
    
  </React.StrictMode>,
)
