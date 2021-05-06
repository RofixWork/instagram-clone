import React from "react";
import "./App.css";
import { CssBaseline } from "@material-ui/core";
import LoginScreen from "./pages/LoginScreen";
import { Switch, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import { auth, db } from "./firebase/Config";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./app/sllices/UserSlice";
import { getPosts } from "./app/sllices/UserPosts";
import ProfileScreen from "./pages/ProfileScreen";
function App() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const unsubscriber = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        const user = auth.currentUser;
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
            username: user.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    // posts
    db.collection("posts")
      .orderBy("currentTime", "desc")
      .onSnapshot((snp) => {
        dispatch(
          getPosts(
            snp.docs.map((doc) => ({
              id: doc.id,
              image: doc.data().image,
              username: doc.data().username,
              title: doc.data().title,
            }))
          )
        );
      });
    return unsubscriber;
  }, [dispatch]);
  return (
    <>
      <CssBaseline />
      {!user ? (
        <LoginScreen />
      ) : (
        <>
          <Switch>
            <Route exact path="/">
              <HomeScreen />
            </Route>
            <Route exact path="/profile/:name">
              <ProfileScreen />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
