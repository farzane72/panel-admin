import { File } from "buffer";

export type ImageType={
  id?: number|string,
  course: string,
  image: File,
  created_datetime?:string,
  modified_datetime?: string

}
export type CourseType = {
    id: number | string;
    title: string;
    teacher:string;
    price: number;
    duration: number;
    images: any;
   // images: ImageType[];
    category:number|string,
    // description: string;
    // number_of_chapter: string;
    // number_of_viewer: string;
    // upload_images: any[];
    // key?:number|string;
  };
  export type AddCategoryType = {
    //id?: number|string
    name: string;
    image:any;
  };
  export type GetCategoryType = {
    //taghir dadam
    id: any
    name: any;
    image:File|string;
  };
  export  type InitialStateType = {
    courses: CourseType[];
    categories: GetCategoryType[];
    statusFormik:string
    searchResults:searchResultsType[];
    statusFilter:string;
    mode:any,
    language:"fa"|"en"|string,
    page:number,
    searchValue:string
   // groups: Group[];
   // statusFormik: string;
  };
  export type declareContextType = {
    courses: CourseType[];
    categories: GetCategoryType[];
    dispatch: Function;
    statusFormik:string;
   // searchResults:SingleCourseType[];
    searchResults:searchResultsType[];
    statusFilter:string;
    mode:any,
    language:"fa"|"en"|string,
    changeLanguage:()=>{},
    page:number,
    searchValue:string

  };
  export type PanelProviderType = {
    children: React.ReactNode;
  };
  
  export type ActionType = {
    type: string;
    // payload : contactType|number|string|{id:number,data:contactType},
    payload: any;
  };  


  export type AddCourseType = {
    id: any;
    title: string;
    teacher:string;
    price: string;
    duration:string;
    images: any[];
   // images:any;
    category:any,
    description: string;
    number_of_chapter:string;
    number_of_viewer: string;
    //upload_images: ImageType[];
    upload_images:any

    rate?:number
   // key?:number|string;
  };

  export type SingleCourseType = {
    id: any;
    title: string;
    teacher:string;
    price: string;
    duration:string;
    images: any[];
   // images:any;
    category:any,
    description: string;
    number_of_chapter:string;
    number_of_viewer: string;
    //upload_images: ImageType[];
    upload_images:any

    rating:number
   // key?:number|string;
  };
  export type searchResultsType={

    id: any;
    title: string;
    teacher:string;
    price: string;
    duration:string;
    images: any[];
    category:any,
    description: string;
    number_of_chapter:string;
    number_of_viewer: string;
    upload_images:any
    rating:number
    name:string
    image:any

  }

  export type OptionTypes = {
    key: string;
    value: string;
  }[];
 