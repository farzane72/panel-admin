import { createContext, useContext, useReducer, useEffect } from "react";
import {
  declareContextType,
  PanelProviderType,
  InitialStateType,
  CourseType,
} from "@/types/PanelTypes";
import { initialState, PanelReducer } from "@/reducer/PanelReducer";
import { privateAxios } from "@/services/privateAxios";
import useMediaQuery from "@mui/material/useMediaQuery";
import i18n from "i18next";
import Select, { SelectChangeEvent } from '@mui/material/Select';
//import { toast } from "react-hot-toast";

//-------------------------reducer-------------------

//-------------------------------------context-------------------------

const valuesContext: declareContextType = {
  ...initialState,
  //contacts: [],

  dispatch: () => {},
  changeLanguage:Function
};

//const reducer=(state:typeof initialState, action:ActionType):typeof initialState => {

const PanelContext = createContext(valuesContext);

function PanelProvider({ children }: PanelProviderType) {
  const [state, dispatch] = useReducer(PanelReducer, initialState);
  const {
    courses,
    categories,
    statusFormik,
    searchResults,
    statusFilter,
    mode,
    language,
    page,
    searchValue
  } = state;
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  //-------------------------------------------------------------------------------------------------------------------

  const addContact = (values: CourseType) => {
    // SetData({ endPoint: "contacts", data: values });
    // dispatch({ type: "add", payload: values });
    // dispatch({ type: "add", payload: data });
  };

  function searchContacts(data: CourseType[]) {
    //console.log("hello search");
    // console.log(data);
    // dispatch({ type: "search", payload: data });
  }
  function changeLanguage(event: SelectChangeEvent) {
    dispatch({type:"changeLang",payload:event.target.value as string})
    
  }

  //-------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    
    dispatch({type:"mode",payload:(localStorage.getItem("mode") ||prefersDarkMode)})

    //mode
  }, [dispatch,mode]);

  useEffect(() => {
    privateAxios.get("/api/course-category/")
    .then((res)=>dispatch({ type:"getCategories", payload: res.data}))
  }, [dispatch]);


  useEffect(()=>{

    i18n.changeLanguage(language)
    localStorage.setItem("language",language)
    document.documentElement.dir=language==="fa"?"rtl":"ltr"
  },[language])
  //-------------------------------------------------------------------------------------------------------------------

  return (
    <PanelContext.Provider
      value={{
        courses,
        categories,
        dispatch,
        statusFormik,
        searchResults,
        statusFilter,
        mode,
        language,
        changeLanguage,
        page,
        searchValue
      }}
    >
      {children}
    </PanelContext.Provider>
  );
}
function usePanel() {
  const context = useContext(PanelContext);
  if (context === null)
    throw new Error("use context was used outside auth provider");
  return context;
}

export { PanelProvider, usePanel };
