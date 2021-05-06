import React from "react";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import Container from "@material-ui/core/Container";
import CreatePost from "../components/CreatePost";

const HomeScreen = () => {
  return (
    <div>
      <Navbar />
      <div className="posts">
        <Container maxWidth="md">
          <CreatePost />
          <Post />
        </Container>
      </div>
    </div>
  );
};

export default HomeScreen;
