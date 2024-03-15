import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const email = useField("email");
  const password = useField("password");
  // Add useField hooks for the new fields
  const firstName = useField("text");
  const lastName = useField("text");
  const phoneNumber = useField("tel"); // Use "tel" for better mobile keyboard support
  const role = useField("text"); // Assuming role is a text input; adjust as needed

  const { signup, error } = useSignup("/api/users/signup");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Include the new fields in the signup function call
    await signup({
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      phoneNumber: phoneNumber.value,
      role: role.value,
    });
    if (!error) {
      console.log("success");
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <>
      <form className="signup" onSubmit={handleFormSubmit}>
        <h3>Sign Up</h3>
        <label>Email address:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} />
        {/* Add inputs for the new fields */}
        <label>First Name:</label>
        <input {...firstName} />
        <label>Last Name:</label>
        <input {...lastName} />
        <label>Phone Number:</label>
        <input {...phoneNumber} />
        <label>Role:</label>
        <input {...role} />
        <button>Sign up</button>
      </form>
    </>
  );
};

export default Signup;
