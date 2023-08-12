import { Navigate, useRoutes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import HomeMain from "../components/pages/home";
import DepartmentDetail from "../components/pages/department/DepartmentDetail";
import LogIn from "../components/pages/login/LogIn";
import MyDepartment from "../components/pages/department/MyDepartment";
import GroupPost from "../components/pages/department/GroupPost";
import Profile from "../components/pages/profile";

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
