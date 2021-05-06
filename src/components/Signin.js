import React, { useState } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { auth } from "../firebase/Config";
import { toaster } from "evergreen-ui";
//formik
//initialValues
const initialValues = {
  email: "",
  password: "",
};

//validationSchema
const validationSchema = yup.object({
  email: yup.string().email("Invalid Format!").required("email is Required!"),
  password: yup.string().required("username is Required!"),
});

//onSubmit
const onSubmit = (values, action) => {
  const { email, password } = values;
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userAuth) => {
      action.resetForm();
    })
    .catch((error) => toaster.warning(error.message));
};

const Signin = () => {
  const [togglePassword, setTogglePassword] = useState("password");
  //showPassword
  const showPassword = () => {
    if (togglePassword === "password") setTogglePassword("text");
    else setTogglePassword("password");
  };
  return (
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
              <ErrorMessage
                name="password"
                component="h6"
                className="text-xs ml-4 text-gray-400 capitalize"
              />
              <VisibilityIcon
                fontSize="small"
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-600"
                onClick={showPassword}
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full bg-blue-400 py-1 text-base text-white rounded hover:bg-blue-500 focus:outline-none"
            >
              Sign in
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Signin;
