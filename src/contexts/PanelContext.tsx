import { createContext, useContext, useReducer, useEffect } from "react";
import {declareContextType,PanelProviderType, InitialStateType,CourseType} from "@/types/PanelTypes"
import { initialState ,PanelReducer} from "@/reducer/PanelReducer";
import { privateAxios } from "@/services/privateAxios";
//import { toast } from "react-hot-toast";

//-------------------------reducer-------------------


//-------------------------------------context-------------------------

const valuesContext: declareContextType = {
  ...initialState,
  //contacts: [],
  
  dispatch: () => {},
 
};



//const reducer=(state:typeof initialState, action:ActionType):typeof initialState => {


const PanelContext = createContext(valuesContext);

function PanelProvider({ children }: PanelProviderType) {
  const [state, dispatch] = useReducer(PanelReducer, initialState);
const {  courses ,categories,statusFormik,searchResults,statusFilter} = state;

  //-------------------------------------------------------------------------------------------------------------------

  const addContact = (values:CourseType) => {
   // SetData({ endPoint: "contacts", data: values });
   // dispatch({ type: "add", payload: values });

    // dispatch({ type: "add", payload: data });
  };

  

  function searchContacts(data: CourseType[]) {
    //console.log("hello search");
    // console.log(data);
   // dispatch({ type: "search", payload: data });
  }
  function editGroup() {
    // GetContacts({ endPoint: "groups" }).then((data) =>
    //   dispatch({ type: "setGroups", payload: data })
    // );
  }
  function changeStatusFormik(status: string) {
   // dispatch({ type: "status", payload: status });
  }

  //-------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    // GetContacts({ endPoint: "contacts" }).then((data) =>
    //   dispatch({ type: "getData", payload: data })
    // );
  }, [dispatch]);
  useEffect(() => {
    privateAxios.get("/api/course-category/")
    .then((res)=>dispatch({ type:"getCategories", payload: res.data}))
  }, [dispatch]);
  //-------------------------------------------------------------------------------------------------------------------

  return (
    <PanelContext.Provider
      value={{
        courses,
        categories,
        dispatch,
        statusFormik,
        searchResults,
        statusFilter
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

export { PanelProvider, usePanel};
