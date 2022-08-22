import { Alert } from "react-bootstrap";
import { useAuth } from "./Auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";

const LogIn = () => {
  const { login, currUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      setError("");
      setLoading(true);
      await login(values.email, values.password);
      navigate("/");
      console.log("Ok Im in as ", currUser.email);
    } catch (err) {
      setError(err.message);
      console.log("error");
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
            }}
            onSubmit={(values) => onSubmit(values)}
          >
            <Form className="card-body">
              <h2 className="text-center mb-4">log in</h2>
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
              <button
                disabled={loading}
                className="btn btn-primary w-100"
                type="submit"
              >
                Log in
              </button>
              <div className="w-100 text-center mt-2">
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
            </Form>
          </Formik>
          <div className="w-100 text-center mt-2">
            Do not have an account?
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
