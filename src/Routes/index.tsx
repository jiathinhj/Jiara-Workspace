import { Navigate, useRoutes } from "react-router-dom";
import HomeMain from "../Pages/Home";
import Profile from "../Pages/Profile";
import Layout from "../Components/Layout";
import Login from "../Pages/Login";
import Scheduler from "../Pages/Scheduler";
import SpaceList from "../Components/Pages/Spaces/SpaceList";
import SpaceDetail from "../Components/Pages/SpaceDetail";

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <Navigate to={"spaces"} /> },
        { path: "home", element: <HomeMain /> },
        { path: "profile", element: <Profile /> },
        { path: "spaces", element: <SpaceList /> },
        { path: "space/:id", element: <SpaceDetail /> },
        // { path: "department/:groupId/:postId", element: <DepartmentPost /> },
        { path: "scheduler", element: <Scheduler /> },
      ],
    },
    { path: "/login", element: <Login /> },
  ]);
};
export default Router;
