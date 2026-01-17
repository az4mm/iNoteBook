import  {  useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Longin = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState({ email: "", password: "" });
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
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={note.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>{" "}
    </div>
  );
};

export default Longin;
