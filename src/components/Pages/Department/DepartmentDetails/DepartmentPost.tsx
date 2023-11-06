import { useNavigate, useParams } from "react-router-dom";
import DepartmentMain from "../../../../Pages/Department";
import Post from "../../../Post";
import { X } from "react-bootstrap-icons";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useQuery } from "react-query";
import Preloader from "../../../Preloader";

const DepartmentPost = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { groupId, postId } = useParams();

  //query to get post details
  const fetchPostById = async () => {
    return await axiosPrivate({
      method: "get",
      url: `/groups/${groupId}/${postId}`,
    });
  };
  const { isLoading, data }: any = useQuery(
    ["post-detail", postId],
    fetchPostById,
    {
      refetchOnWindowFocus: false,
    }
  );
  console.log(data);

  return (
    <DepartmentMain>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <X
            style={{ fontSize: "30px", marginBlock: "10px", float: "right" }}
            className="inline-icon"
            onClick={() => navigate(-1)}
          />
          <Post
            post={data?.data.postData}
            comments={data?.data.postData.comments}
            groupId={groupId}
            postId={postId}
          />
        </>
      )}
    </DepartmentMain>
  );
};

export default DepartmentPost;
