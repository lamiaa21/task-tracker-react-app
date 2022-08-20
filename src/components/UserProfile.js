import { Alert } from "react-bootstrap";
import React, { useEffect} from "react";
import { useAuth } from "./Auth";
import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UserProfile = () => {
  const { currUser, updatePassword, updateEmail, refineErr } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState();

  const profileChange = (e) => {
    console.log(e);
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };
  useEffect(() => {
    if (currUser?.photoURL) {
      setPhotoURL(currUser?.photoURL);
    }
  }, [currUser]);

  const upload = async (file, currUser, setLoading) => {
    const fileref = ref(getStorage(), "images/" + currUser.uid + ".png");
    setLoading(true);
    const snapshot = await uploadBytes(fileref, file);
    const photoURL = await getDownloadURL(fileref);

    updateProfile(currUser, { photoURL });
    setLoading(false);
    alert("Upload done!");
  };

  const onSubmit = (values) => {
    console.log(values);
    if (values.password !== values.passwordConfirm) {
      return setError("Passwords do not match");
    }

    const changes = [];
    if (values.email !== currUser.email) {
      changes.push(updateEmail(values.email));
    }
    if (values.password !== "") {
      changes.push(updatePassword(values.password));
    }
    if (values.name !== "") {
      changes.push(
        currUser.updateProfile({
          displayName: values.name,
        })
      );
    }

    if (photo) {
      console.log("got here");
      changes.push(upload(photo, currUser, setLoading));
    }

    Promise.all(changes)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setError(refineErr(err.message));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <Formik
        initialValues={{
          email: currUser.email,
          name: currUser.displayName,
          password: "",
          passwordConfirm: "",
          profile: "",
        }}
        onSubmit={(values) => onSubmit(values)}
      >
        <Form className="mb-3">
          <h2 className="text-center mb-4">My profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
            <img src={photoURL} alt="avatar" style={{
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                  borderRadius: "50%",
                  width: "10vw",
                }} />
          </div>

          <Field
           className="form-control"
            id="email"
            name="email"
            placeholder="put your email"
            type="email"
            disabled
          />
          <Field className="form-control" id="name" name="name" placeholder="put your name" />
          
          <Field
           className="form-control"
            id="password"
            name="password"
            placeholder="change the password"
            type="password"
          />
          <Field
           className="form-control"
            id="passwordConfirm"
            name="passwordConfirm"
            placeholder="rewrite the password"
            type="password"
          />
          <input
            className="form-control"
            name="profile"
            id="profile"
            type="file"
            onChange={(e) => profileChange(e)}
          />

          <button disabled={loading} className="btn btn-dark w-100" type="submit">
            Update
          </button>
        </Form>
      </Formik>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </div>
  );
};

export default UserProfile;
