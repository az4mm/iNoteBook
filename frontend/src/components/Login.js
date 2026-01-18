import  {  useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    console.log(response);
    const json_ = await response.json();
    console.log(json_);
    if (json_.success) {
      //save the auth token and redirect
      localStorage.setItem("token", json_.authToken);
      console.log("logged in successfully");
      navigate("/");
    } else {
      alert("Invalid credentials");
      console.log("invalid credentials");
    }
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  useEffect(() => {
      if (localStorage.getItem("token")) {
        navigate("/");
      }
    }, [navigate]);

  return (
    <div className="container mt-2">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={note.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              name="password"
              value={note.password}
              onChange={onChange}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <i
                className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                aria-hidden="true"
              ></i>
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>{" "}
    </div>
  );
};

export default Login;
