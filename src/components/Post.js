import React from "react";
import Grid from "@material-ui/core/Grid";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const Post = () => {
  const { posts } = useSelector((state) => state.posts);
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={9}>
          {posts.length ? (
            posts.map((post) => {
              return (
                <div
                  key={post.id}
                  className="border bg-white rounded w-full my-3 overflow-hidden"
                >
                  {/* name user and image user */}
                  <div className="px-2 py-3 flex items-center">
                    <div className="bg-gray-700 h-8 w-8 rounded-full flex justify-center items-center">
                      <h3 className="text-white text-sm font-sans uppercase">
                        {post.username.charAt(0)}
                      </h3>
                    </div>
                    <div className="ml-1">
                      <h3 className="text-sm font-semibold font-sans ">
                        {post.username}
                      </h3>
                    </div>
                  </div>
                  {/* name user and image user */}
                  {/* image post */}
                  <div className="w-full" style={{ height: "auto" }}>
                    <img
                      src={post.image}
                      alt="image post"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="px-4 py-2">
                    <h3 className="text-lg font-bold font-sans capitalize">
                      {post.title}
                    </h3>
                  </div>
                  {/* image post */}
                  {/* comments */}
                  <Comment id={post.id} />
                  {/* comments */}
                </div>
              );
            })
          ) : (
            <div className="my-3">
              <SkeletonTheme>
                <div className="flex items-center">
                  <Skeleton width={40} height={40} circle={true} />
                  <Skeleton width={60} className="ml-2" />
                </div>
                <Skeleton height={400} />
                <Skeleton width={80} />
                <Skeleton height={30} />
              </SkeletonTheme>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Post;
