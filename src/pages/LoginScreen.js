import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import { Hidden, useMediaQuery, useTheme } from "@material-ui/core";

const LoginScreen = () => {
  const [signup, setSignup] = useState(false);
  const toggle = () => setSignup(!signup);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <Container maxWidth={`${mobile ? "sm" : "md"}`}>
        <Grid container alignItems="center">
          <Hidden smDown>
            <Grid item md={7}>
              <div>
                <img
                  className="w-full h-full object-cover"
                  src="/images/phone.jpg"
                  alt="imglogin"
                />
              </div>
            </Grid>
          </Hidden>
          <Grid item xs={12} md={5}>
            <div className="bg-white px-6 py-6 border rounded">
              <img
                src="/images/logo.png"
                className="h-10 mx-auto mb-3"
                alt="logo"
              />

              {signup ? <Signup /> : <Signin />}
            </div>
            {/* login or lougout  */}
            <div className="bg-white py-2 mt-2 border rounded">
              {signup ? (
                <>
                  <h3 className="text-center">
                    Have an account?
                    <span
                      onClick={toggle}
                      className="text-sm cursor-pointer text-blue-400 ml-1 hover:underline"
                    >
                      Login
                    </span>
                  </h3>
                </>
              ) : (
                <>
                  <h3 className="text-center">
                    Don't have an account?
                    <span
                      onClick={toggle}
                      className="text-sm cursor-pointer text-blue-400 ml-1 hover:underline"
                    >
                      Register
                    </span>
                  </h3>
                </>
              )}
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default LoginScreen;
