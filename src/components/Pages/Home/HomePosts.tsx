import React, { useEffect } from "react";
import Post from "../../Post";
import axios from "../../../Api/axios";
import { useInfiniteQuery, useQuery } from "react-query";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { getAllUserSuccess } from "../../../Redux/userSlice";

const HomePost = () => {
  console.log("error");
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const fetchPost = async ({ pageParam = 1 }) => {
    const res = await axios.get(
      `https://64f977c74098a7f2fc146f01.mockapi.io/newfeeds/posts?limit=10&page=${pageParam}`
    );
    return res.data;
  };
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  }: any = useInfiniteQuery({
    queryKey: ["newfeed-posts"],
    queryFn: fetchPost,
    getNextPageParam: (lastPage, pages) => {
      //lastPage is the data loaded
      const maxPage = 10; //Api data has 100 items, displayed 10 per page
      const nextPage = pages.length + 1;
      return nextPage <= maxPage ? nextPage : undefined;
    },
    refetchOnWindowFocus: false,
  });

  const getAllAccounts = async () => {
    return await axiosPrivate({
      method: "get",
      url: "/accounts",
    });
  };

  const { data: allUser } = useQuery("accounts", getAllAccounts, {
    select: (data) => {
      return data.data.data;
    },
    onSuccess: (data) => dispatch(getAllUserSuccess(data)),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    let fetching = false;
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;
      // console.log(scrollHeight, scrollTop, clientHeight);
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  return status === "loading" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      {data.pages.map((page: any, i: number) => (
        <div className="home-post" key={i}>
          {page.map((post: any) => (
            <Post post={post} postId={post.postId} />
          ))}
        </div>
      ))}
      <div>{!hasNextPage ? "Nothing more to load" : null}</div>
      <div>{isFetchingNextPage ? "Loading" : null}</div>
    </>
  );
};

export default HomePost;
