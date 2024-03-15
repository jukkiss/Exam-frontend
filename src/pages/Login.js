import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const email = useField("email");
  const password = useField("password");
  const { login, error } = useLogin("/api/users/login");

  const [attemptFailed, setAttemptFailed] = useState(false);

  useEffect(() => {
    if (attemptFailed && !error) {
      setIsAuthenticated(true);
      navigate("/");
    }
  }, [attemptFailed, error, setIsAuthenticated, navigate]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setAttemptFailed(false); // Reset attempt status before trying
    await login({ email: email.value, password: password.value });
    setAttemptFailed(true); // Mark attempt as done to trigger the useEffect
  };

  return (
    <>
      <form className="signup" onSubmit={handleFormSubmit}>
        <h3>Login</h3>
        <label>Email address:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} type="password" />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
};

export default Login;
