import React, { useState } from "react";
import { useAuth } from "./Auth";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Alert } from "react-bootstrap";

const SignUp = () => {
  const { signUp } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    if (values.password !== values.passwordConfirm) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signUp(values.email, values.password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="card w-100" style={{ maxWidth: "400px" }}>
          <Formik
            initialValues={{
              email: "",
              password: "",
              passwordConfirm: "",
            }}
            onSubmit={(values) => onSubmit(values)}
          >
            <Form className="card-body">
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Field
               className="form-control"
                id="email"
                name="email"
                type="email"
                placeholder="Email Address"
                required
              />
              <Field
              className="form-control"
                id="password"
                name="password"
                type="password"
                placeholder="Create a Password"
                required
              />
              <Field
              className="form-control"
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                placeholder="Confirm your password"
                required
              />
              <button disabled={loading} className="btn btn-primary w-100" type="submit">
                Sign Up
              </button>

              <div className="w-100 text-center mt-2">
                Already have an account?
                <Link to="/login">Log in</Link>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};
export default SignUp;
