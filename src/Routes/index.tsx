import { Navigate, useRoutes } from "react-router-dom";
import HomeMain from "../Pages/Home";
import Profile from "../Pages/Profile";
import Layout from "../Components/Layout";
import ChatBox from "../Pages/Chat";
import DepartmentDetail from "../Components/Pages/Department/DepartmentDetails";
import DepartmentLists from "../Components/Pages/Department/DepartmentLists";
import Login from "../Pages/Login";
import DepartmentPost from "../Components/Pages/Department/DepartmentDetails/DepartmentPost";

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <Navigate to={"department"} /> },
        { path: "home", element: <HomeMain /> },
        { path: "profile", element: <Profile /> },
        { path: "department", element: <DepartmentLists /> },
        { path: "department/:id", element: <DepartmentDetail /> },
        { path: "department/:groupId/:postId", element: <DepartmentPost /> },
        { path: "chat", element: <ChatBox /> },
      ],
    },
    { path: "/login", element: <Login /> },
  ]);
};
export default Router;
