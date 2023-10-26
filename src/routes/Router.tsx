import { Navigate, useRoutes } from "react-router-dom";
import HomeMain from "../pages/home";
import DepartmentDetail from "../components/pages/department/detail";
import MyDepartment from "../components/pages/department/departments";
import GroupPost from "../components/pages/department/post";
import Profile from "../pages/profile";
import Layout from "../components/Layout";
import LogIn from "../pages/login";
import ChatBox from "../pages/ChatBox";

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <Navigate to={"deppartment"} /> },
        { path: "home", element: <HomeMain /> },
        { path: "profile", element: <Profile /> },
        { path: "department", element: <MyDepartment /> },
        { path: "department/:id", element: <DepartmentDetail /> },
        { path: "department/:groupId/:postId", element: <GroupPost /> },
        { path: "chat", element: <ChatBox /> },
      ],
    },
    { path: "/login", element: <LogIn /> },
  ]);
};
export default Router;
