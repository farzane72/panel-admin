import router from "./routes/Routes";
import { RouterProvider } from "react-router-dom";
import { PanelProvider } from "./contexts/PanelContext";
import i18n from "./core/i18n/i18n";
import { I18nextProvider } from "react-i18next";

//import { createTheme, ThemeProvider } from "@mui/material";
//import CssBaseline from '@mui/material/CssBaseline';
//import yekanbakh from '@/assets/fonts/Yekan-bakh/'
//import "@/assets/styles/fonts.css"


// const theme = createTheme({
//   typography: {
//     //fontFamily: ["Chilanka", "cursive"].join(","),
//    //fontFamily:  ['yekanbakh', 'system-ui', 'sans-serif'].join(",")
//    // fontFamily:['Vazirmatn' ,'sans-serif'].join(",")
//   },
//   components: {
//     MuiCssBaseline: {
//       styleOverrides: `
//         @font-face {
//           font-family: 'yekanbakh';
//           font-style: normal;
//           font-display: swap;
//           font-weight: 400;
//           src: local('yekanbakh'), local('yekanbakh-Regular'), url("../assets/fonts/Yekan-bakh/YEKANBAKHFANUM-REGULAR.TTF") format("truetype");
//           unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
//         }
//       `,
//     },
//   },
// });

function App() {
  return (
    // <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <PanelProvider>
          <RouterProvider router={router} />
        </PanelProvider>
      </I18nextProvider>
    // </ThemeProvider>
  );
}

export default App;
