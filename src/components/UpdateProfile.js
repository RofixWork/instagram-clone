import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { close } from "../app/sllices/GeneralSlice";
import { toaster } from "evergreen-ui";
import { auth, db } from "../firebase/Config";
const UpdateProfile = () => {
  const { dialog } = useSelector((state) => state.general);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [newusername, setNewusername] = React.useState("");
  //   update username
  const updateUsername = () => {
    if (newusername.trim()) {
      let user = auth.currentUser;

      user.updateProfile({
        displayName: newusername,
      });

      db.collection("posts")
        .orderBy("currentTime", "desc")
        .onSnapshot((snp) => {
          const allPosts = snp.docs.map((post) => ({
            id: post.id,
            title: post.data().title,
            username: post.data().username,
            image: post.data().image,
          }));
          const filterPosts = allPosts.filter(
            (post) => post.username === user.username
          );
          //   const mappingPosts = filterPosts.
          console.log(filterPosts);
        });
    } else {
      dispatch(close());
      toaster.warning("please fill input...");
    }
  };

  return (
    <div>
      <div>
        <Dialog
          open={dialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth="sm"
          onClose={() => dispatch(close())}
        >
          <DialogTitle id="alert-dialog-title">Edite Your Profile</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <input
                type="text"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-gray-700"
                placeholder="Enter new Username..."
                value={newusername}
                onChange={(e) => setNewusername(e.target.value)}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              onClick={() => dispatch(close())}
              className="px-4 py-2 bg-red-600 hover:bg-red-800 rounded text-white focus:outline-none"
            >
              Disagree
            </button>
            <button
              onClick={updateUsername}
              className="px-4 py-2 bg-green-600 hover:bg-green-800 rounded text-white focus:outline-none"
            >
              Agree
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default UpdateProfile;
