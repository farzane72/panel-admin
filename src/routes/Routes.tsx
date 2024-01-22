 import { createBrowserRouter } from "react-router-dom";
 import Error from "@/components/error/Error";
 import Courses from "@/pages/courses/Courses";
 import Categories from "@/pages/categories/Categories";
 import DashboardLayout from "@/layout/dashboard/DashboardLayout";
 import Dashboard from "@/pages/dashboard/Dashboard";
 import Login from "@/pages/login/Login";
 import Register from "@/pages/register/Register";
 import AddCourse from "@/pages/add/addCourse";
 import AddCategory from "@/pages/add/addCategory";
 import EditCourse,{loader as EditCourseLoader } from "@/pages/edit/EditCourse";
 import SingleCourse ,{loader as SingleCourseLoader} from "@/pages/courses/SingleCourse";
 import SingleCategory,{loader as SingleCategoryLoader} from "@/pages/categories/SingleCategory";


 const router=createBrowserRouter([

    {
        element: <Login />,
        errorElement:<Error />,
       // loader:ContactsLoader,
        path: "/login"
    },
    {
        element: <Register />,
        errorElement:<Error />,
       // loader:ContactsLoader,
        path: "/register"
    },
     {
        element: <DashboardLayout />,
         errorElement:<Error />,
         children: [
             {
                 element: <Dashboard />,
                 errorElement:<Error />,
                // loader:ContactsLoader,
                 path: "/dashboard"
             },
              {
                element: <Categories />,
                errorElement:<Error />,
               // loader:ContactsLoader,
                path: "/dashboard/categories"
            },
            {
                element: <Courses />,
                errorElement:<Error />,
               // loader:ContactsLoader,
                path: "/dashboard/courses"
            },
            {
                element: <AddCourse />,
                errorElement:<Error />,
               // loader:ContactsLoader,
                path: "/dashboard/addcourse"
            },
            {
                element: <EditCourse />,
                errorElement:<Error />,
                loader:EditCourseLoader,
                path: "/dashboard/editcourse/:courseId"
            },
            {
                element: <SingleCourse />,
                errorElement:<Error />,
                loader:SingleCourseLoader,
                path: "/dashboard/courses/singlecourse/:courseId"
            },
            {
                element: <AddCategory />,
                errorElement:<Error />,
               // loader:ContactsLoader,
                path: "/dashboard/addcategory"
            },
            {
                element: <SingleCategory />,
                errorElement:<Error />,
                loader:SingleCategoryLoader,
                path: "/dashboard/categories/singlecategory/:categoryId"
            },
          
        ]
     }

 ]) 

// ///dashboard/course/add or edit

 export default router;