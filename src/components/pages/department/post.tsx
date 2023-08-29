import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DepartmentMain from "../../../pages/department";
import Post from "../../post";
import { X } from "react-bootstrap-icons";
import { useLoading } from "../../context/loading";
import { getAPI } from "../../../api";

const GroupPost = () => {
  const { setLoading }: any = useLoading();

  const [comments, setComments] = useState<any>();
  const [post, setPost] = useState<any>([]);

  const navigate = useNavigate();

  // const groupId = groupDetail.groupId;
  const { groupId, postId } = useParams();

  //call api to get post details
  const fetchPostById = async () => {
    const res = await getAPI(`/groups/${groupId}/${postId}`);
    setPost(res?.data.postData);
    setComments(res?.data.postData.comments);
    setLoading(false);
  };

  useEffect(() => {
    fetchPostById();
  }, [groupId, postId]);

  return (
    <DepartmentMain>
      <X
        style={{ fontSize: "30px", marginBlock: "10px", float: "right" }}
        className="inline-icon"
        onClick={() => navigate(-1)}
      />
      <Post
        post={post}
        comments={comments}
        // path={`${apiURL.groups}/${groupId}/${postId}`}
        groupId={groupId}
        postId={postId}
        fetchPostById={fetchPostById}
      />
    </DepartmentMain>
  );
};

export default GroupPost;
