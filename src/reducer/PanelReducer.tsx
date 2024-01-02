import { CourseType, ActionType, InitialStateType } from "@/types/PanelTypes";

const initialState: InitialStateType = {
  courses: [],
  categories: [],
  statusFormik: "",
  searchResults: [],
  statusFilter: "default",
 
  //groups: [],
  //statusFormik: "",
};
const PanelReducer = (
  state: InitialStateType,
  action: ActionType
): InitialStateType => {
  switch (action.type) {
    //------------------second after set----------------
    case "getCourses":
      return { ...state, courses: action.payload };
    case "addCourse":
      return { ...state, courses: [...state.courses, action.payload] };
    case "deleteCourse":
      return {
        ...state,
        courses: state.courses.filter((item) => item.id != action.payload),
      };
    case "editCourse":
      return {
        ...state,
        courses: state.courses.map((item) =>
          item.id === action.payload.id ? { ...action.payload.data } : item
        ),
      };
    case "getCategories":
      return { ...state, categories: action.payload };
    case "addCategory":
      return { ...state, categories: [...state.categories, action.payload] };
    case "deleteCategory":
      return {
        ...state,
        categories: state.categories.filter(
          (item) => item.id != action.payload
        ),
      };
    case "editCategory":
      return {
        ...state,
        categories: state.categories.map((item) =>
          item.id === action.payload.id ? { ...action.payload.data } : item
        ),
      };
    case "statusFormik":
      return { ...state, statusFormik: action.payload };
    case "search":
      return { ...state, searchResults: action.payload };
    case "statusFilter":
      return { ...state, statusFilter: action.payload };
    // case "setGroups":
    //   return { ...state, groups: action.payload };
    // case "status":
    // return { ...state, statusFormik: action.payload };

    default:
      throw new Error("you didn't choose any case");
  }
};

export { PanelReducer, initialState };
