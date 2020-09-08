import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import axios from "axios";


const ValidatedSignupForm = () => (

  <Formik
    initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {

      axios
        .post("https://api.raisely.com/v3/check-user", {
          "campaignUuid": "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
          "data": {
            "email": values.email
          }
        })
        .then((res) => {
          console.log('res', res.data.data.status);
          if (res.data.data.status === "OK") {
            axios.post('https://api.raisely.com/v3/signup', {
              "campaignUuid": "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
              "data": {
                "firstName": values.firstName,
                "lastName": values.lastName,
                "email": values.email,
                "password": values.password
              }
            })
              .then((res) => {
                console.log(res.data)
                alert(res.data.message)
              }).catch((error) => {
                console.log('err: ', error)

              });
          } else if (res.data.data.status === "EXISTS") {
            alert('Email already exists, please use another email.');
          }
        })
        .catch((error) => {
          console.log('err: ', error);

        });
      setTimeout(() => {

        setSubmitting(false);
      }, 500);
    }}
    validationSchema={Yup.object().shape({
      firstName: Yup.string().required("First name is required."),
      lastName: Yup.string().required("Last name is required."),
      email: Yup.string().email().required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number.")
    })}
  >

    {(props) => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;
      return (

        <div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input
              name="firstName"
              type="text"
              placeholder="First name"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.firstName && touched.firstName && "error"}
            />
            {errors.firstName && touched.firstName && (
              <div className="input-feedback">{errors.firstName}</div>
            )}
            <label htmlFor="lastName">Last name</label>
            <input
              name="lastName"
              type="text"
              placeholder="Last name"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.lastName && touched.lastName && "error"}
            />
            {errors.lastName && touched.lastName && (
              <div className="input-feedback">{errors.lastName}</div>
            )}{errors.duplicate}
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email && touched.email && "error"}
            />
            {errors.email && touched.email && (
              <div className="input-feedback">{errors.email}</div>
            )}
            <label htmlFor="email">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password && touched.password && "error"}
            />
            {errors.password && touched.password && (
              <div className="input-feedback">{errors.password}</div>
            )}
            <button type="submit" disabled={isSubmitting}>
              Login
          </button>
          </form>

        </div>
      );
    }}

  </Formik>
);

export default ValidatedSignupForm;
