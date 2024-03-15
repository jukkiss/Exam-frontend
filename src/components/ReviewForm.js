import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReviewForm = () => {
  const navigate = useNavigate();
  const [reviewer, setReviewer] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError("You must be logged in");
      return;
    }

    const review = { reviewer, rating: Number(rating), comment };
    const response = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify(review),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setReviewer("");
      setRating("");
      setComment("");
      setError(null);
      navigate("/login"); // Assuming you want to redirect to the homepage or a specific page after submission
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Review</h3>

      <label>Reviewer:</label>
      <input
        type="text"
        onChange={(e) => setReviewer(e.target.value)}
        value={reviewer}
      />
      <label>Rating:</label>
      <input
        type="number" // Changed to 'number' to better suit rating input
        onChange={(e) => setRating(e.target.value)}
        value={rating}
      />
      <label>Comment:</label>
      <textarea // Changed to textarea for longer comments
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      ></textarea>

      <button type="submit">Submit Review</button> {/* Changed button text to match the action */}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ReviewForm;
