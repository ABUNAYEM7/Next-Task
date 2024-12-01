import { FaEye, FaEyeSlash } from "react-icons/fa";
import Info from "./Info";
import { useContext, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { TaskContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const pathname = useOutletContext();
  const { registerUsers, signInWithGoogle, updatedUserProfile } =
    useContext(TaskContext);

  const submitHandler = (e) => {
    e.preventDefault();
    setErr("");

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const pass = form.pass.value;

    // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).*$/;

    // if (!regex.test(pass)) {
    //     return setErr("Password must include at least 1 uppercase, 1 lowercase, and 1 special character")
    //   }

    registerUsers(email, pass)
      .then((user) => {
        if (user) {
          form.reset();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Registration successful",
            showConfirmButton: false,
            timer: 1500,
          });

          // updateUserProfile
          const updatedData = {
            displayName: name,
            photoURL: photo,
          };
          updatedUserProfile(updatedData);

          // storeUser-In-DB
          const user = {
            name,
            photo,
            email,
          };

          fetch("https://task-next-server.vercel.app/users", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(user),
          });

          if (pathname) {
            navigate(pathname);
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => {
        setErr(err.message || err.code);
      });
  };

  const googleClickHandler = () => {
    signInWithGoogle()
      .then((user) => {
        if (user) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Registration successful",
            showConfirmButton: false,
            timer: 1500,
          });
          if (pathname) {
            navigate(pathname);
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => {
        setErr(err.message || err.code);
      });
  };

  return (
    <div className="my-12 p-4 md:p-6">
      <div className="mb-6">
        <Info
          title={"Please Register"}
          subtitle={`Emphasizes defining actionable steps toward a goal, encouraging
        productivity through prioritization and focus on immediate objectives`}
        />
      </div>
      <div className="min-h-[500px] flex items-center justify-center ">
        <div className="w-full md:w-1/2 mx-auto">
          <form
            onSubmit={submitHandler}
            className="card-body bg-black p-6 rounded-xl"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                name="photo"
                type="text"
                placeholder="Photo URL"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="pass"
                type={show ? "text" : "password"}
                placeholder="password"
                className="input input-bordered"
                required
              />
              <div className=" rounded-full  absolute right-3 top-12">
                <button onClick={() => setShow(!show)} type="button">
                  {show ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
              {err && (
                <label className="label">
                  <p className="text-lg font-medium text-red-600">{err}</p>
                </label>
              )}
            </div>
            <div className="form-control mt-6 space-y-3">
              <button className="btn btn-success text-white">Register</button>
              <button
                onClick={googleClickHandler}
                className="btn btn-success text-white"
              >
                LogIn With Google
              </button>
            </div>
          </form>
          <div className="my-3 text-center">
            <h3 className="text-lg font-medium">
              Already Have An Account ?{" "}
              <span>
                <Link to={"/SignIn"} className="text-[#00935f]">
                  Sign In
                </Link>
              </span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
