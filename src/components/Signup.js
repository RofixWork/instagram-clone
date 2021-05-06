import React from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { auth } from "../firebase/Config";
import { toaster } from "evergreen-ui";
//formik
//initialValues
const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmePassword: "",
};

//validationSchema
const validationSchema = yup.object({
  username: yup.string().required("username is Required!"),
  email: yup.string().email("Invalid Format!").required("email is Required!"),
  password: yup.string().required("username is Required!"),
  confirmePassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "password not match...")
    .required("Confirme Password is Required!"),
});

//onSubmit
const onSubmit = (values, action) => {
  const { username, email, password } = values;
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userAuth) => {
      const user = userAuth.user;
      user.updateProfile({
        displayName: username,
      });
      action.resetForm();
    })
    .catch((error) => toaster.warning(error.message));
};

const Signup = () => {
  const [togglePassword, setTogglePassword] = React.useState("password");
  //showPassword
  const showPassword = () => {
    if (togglePassword === "password") setTogglePassword("text");
    else setTogglePassword("password");
  };
  return (
    <>
      <h3 className="lg:text-xl text-center text-gray-400 font-normal sm:text-base">
        Sign up to see photos and videos from your friends.
      </h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form className="py-2">
              <div className="my-3">
                <Field
                  className="border px-4 py-2 w-full rounded focus:outline-none focus:border-gray-900"
                  type="text"
                  placeholder="Enter Your Username"
                  name="username"
                />
                <ErrorMessage
                  name="username"
                  component="h6"
                  className="text-xs ml-4 text-gray-400 capitalize"
                />
              </div>
              <div className="my-3">
                <Field
                  className="border px-4 py-2 w-full rounded focus:outline-none focus:border-gray-900"
                  type="text"
                  placeholder="Enter Your Email"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  component="h6"
                  className="text-xs ml-4 text-gray-400 capitalize"
                />
              </div>
              <div className="my-3 relative">
                <Field
                  className="border px-4 py-2 w-full rounded focus:outline-none focus:border-gray-900"
                  type={togglePassword}
                  placeholder="Enter Your Password"
                  name="password"
                />
                <VisibilityIcon
                  fontSize="small"
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-600"
                  onClick={showPassword}
                />
                <ErrorMessage
                  name="password"
                  component="h6"
                  className="text-xs ml-4 text-gray-400 capitalize"
                />
              </div>
              <div className="my-3">
                <Field
                  className="border px-4 py-2 w-full rounded focus:outline-none focus:border-gray-900"
                  type="password"
                  placeholder="Confirme Password"
                  name="confirmePassword"
                />
                <ErrorMessage
                  name="confirmePassword"
                  component="h6"
                  className="text-xs ml-4 text-gray-400 capitalize"
                />
              </div>
              <button
                type="submit"
                className="mt-2 w-full bg-blue-400 py-1 text-base text-white rounded hover:bg-blue-500 focus:outline-none"
              >
                Sign up
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default Signup;
