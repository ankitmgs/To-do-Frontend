import React, { useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Formik } from "formik";
import app_config from "../config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Signup = () => {
  const navigate = useNavigate();
  const [isloading, setIsloading] = useState(false);

  const url = app_config.api_url;

  const signupForm = {
    email: "",
    username: "",
    password: "",
  };

  const signupSubmit = (formData) => {
    setIsloading(true);
    console.log(formData);
    fetch(url + "/user/add", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Registered Successfully",
          }).then(() => {
            navigate("/login");
          });
        }
        setIsloading(false);
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div>
      <Formik initialValues={signupForm} onSubmit={signupSubmit}>
        {({ values, handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <MDBContainer
              fluid
              className="todo-container d-flex align-items-center justify-content-center bg-image"
              
            >
              <div className="mask gradient-custom-3"></div>
              <MDBCard className="todo-card" style={{ maxWidth: "600px" }}>
                <MDBCardBody className="todo-card-body">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>
                  <label>Email</label>
                  <MDBInput
                    wrapperClass="mb-4"
                    id="email"
                    type="email"
                    placeholder="Enter Email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <label>Name</label>
                  <MDBInput
                    wrapperClass="mb-4"
                    id="username"
                    type="text"
                    placeholder="Enter Name"
                    value={values.username}
                    onChange={handleChange}
                  />
                  <label>Password</label>
                  <MDBInput
                    wrapperClass="mb-4"
                    id="password"
                    type="password"
                    placeholder="Enter Password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  <div className="d-flex flex-row justify-content-center mb-4">
                    <MDBCheckbox
                      name="flexCheck"
                      id="flexCheckDefault"
                      label="I agree all statements in Terms of service"
                    />
                  </div>
                  <button
                    className="btn btn-primary mb-4 w-100 gradient-custom-4"
                    size="lg"
                    type="submit"
                  >
                    {isloading ? <CircularProgress size="1.2rem" style={{color: "white"}} /> : "Register"}
                  </button>
                </MDBCardBody>
              </MDBCard>
            </MDBContainer>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
