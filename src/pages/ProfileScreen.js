import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {
  Menu,
  Popover,
  Position,
  toaster,
  TrashIcon,
  EditIcon,
} from "evergreen-ui";
import Comment from "../components/Comment";
import { db } from "../firebase/Config";
import UpdateProfile from "../components/UpdateProfile";
import { useDispatch } from "react-redux";
// import { open } from "../app/sllices/GeneralSlice";
const ProfileScreen = () => {
  const { user } = useSelector((state) => state.user);
  const { name } = useParams();
  const [myPosts, setMyPosts] = useState([]);
  const dispatch = useDispatch();

  const deletePost = (id) => {
    db.collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        toaster.success("Post Deleted...");
      })
      .catch((error) => {
        toaster.warning(error);
      });
  };

  useEffect(() => {
    const unsubscriber = db
      .collection("posts")
      .orderBy("currentTime", "desc")
      .onSnapshot((snp) => {
        const getPosts = snp.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          image: doc.data().image,
          username: doc.data().username,
        }));

        const filterPosts = getPosts.filter(
          (post) => post.username.toLowerCase() === name.toLowerCase()
        );
        setMyPosts(filterPosts);
      });
    return unsubscriber;
  }, [name]);

  return (
    <div>
      <Navbar />
      <div className="posts">
        <Container maxWidth="md">
          <Grid container>
            <Grid item xs={12} md={9}>
              {/* Profile Info */}
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-16 w-16 rounded-full bg-gray-700 flex justify-center items-center text-white">
                    <h3 className="text-2xl font-sans font-bold">
                      {user.username.charAt(0)}
                    </h3>
                  </div>
                  <div>
                    <div className="ml-2 font-semibold text-xl">
                      {user.username}
                    </div>
                    <div className="ml-2 text-sm text-gray-400">
                      Your Profile
                    </div>
                  </div>
                </div>
                <div>
                  {/* <button
                    className="p-2 focus:outline-none"
                    onClick={() => dispatch(open())}
                    title="Edite Profile"
                  >
                    <EditIcon className="text-lg" />
                  </button>

                  {/* //update profile */}
                  {/* <UpdateProfile /> */}
                  {/* //update profile */}
                </div>{" "}
              </div>
              {/* Profile Info */}

              <div className="border mb-4 mt-4 border-gray-200"></div>

              {myPosts.length ? (
                myPosts.map((post, index) => {
                  return (
                    <div
                      key={index}
                      className="border bg-white rounded w-full my-3 overflow-hidden"
                    >
                      {/* name user and image user */}
                      <div className="flex justify-between items-center">
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

                        <div className="pr-2">
                          <Popover
                            position={Position.BOTTOM_LEFT}
                            content={
                              <Menu>
                                <Menu.Group>
                                  <Menu.Item
                                    onClick={() => deletePost(post.id)}
                                    icon={TrashIcon}
                                    intent="danger"
                                  >
                                    Remove...
                                  </Menu.Item>
                                </Menu.Group>
                              </Menu>
                            }
                          >
                            <button className="text-gray-600 hover:text-gray-900 focus:outline-none">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </button>
                          </Popover>
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
                  <h1 className="text-left text-lg font-semibold">No Post</h1>
                </div>
              )}
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default ProfileScreen;
