import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiURL, getPostById } from "../../../redux/apiRequest";
import DepartmentMain from ".";
import Post from "../../NewFeeds/Post";
import { X } from "react-bootstrap-icons";
import { useLoading } from "../../preloader/LoadingContext";

const GroupPost = () => {
  const { setLoading }: any = useLoading();

  const [comments, setComments] = useState<any>();
  const [post, setPost] = useState<any>([]);
  // const [path, setPath] = useState<any>();

  const navigate = useNavigate();

  // const groupId = groupDetail.groupId;
  const { groupId, postId } = useParams();

  // const handleGroupPath = async () => {
  //   if (groupId !== undefined) {
  //     setPath(`${apiURL.groups}/${groupId}/${postId}`);
  //   } else {
  //     const groupId = location.pathname.split("/")[2];
  //     setPath(`${apiURL.groups}/${groupId}/${postId}`);
  //   }
  // };

  //call api to get post details
  const fetchPostById = async () => {
    const path = `${apiURL.groups}/${groupId}/${postId}`;
    const res = await getPostById(path);
    setPost(res);
    setComments(res.comments);
    setLoading(false);
  };

  // useEffect(() => {
  //   handleGroupPath();
  //   // console.log(path)
  // }, []);

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
        path={`${apiURL.groups}/${groupId}/${postId}`}
      />
    </DepartmentMain>
  );
};

export default GroupPost;
