import { Navigate, useRoutes } from "react-router-dom";
import HomeMain from "../pages/home";
import DepartmentDetail from "../components/pages/department/detail";
import MyDepartment from "../components/pages/department/departments";
import GroupPost from "../components/pages/department/post";
import Profile from "../pages/profile";
import Layout from "../components/layout";
import LogIn from "../pages/login";

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <Navigate to={"home"} /> },
        { path: "home", element: <HomeMain /> },
        { path: "profile", element: <Profile /> },
        { path: "department", element: <MyDepartment /> },
        { path: "department/:id", element: <DepartmentDetail /> },
        { path: "department/:groupId/:postId", element: <GroupPost /> },
      ],
    },
    { path: "/login", element: <LogIn /> },
  ]);
};
export default Router;
