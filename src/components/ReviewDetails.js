import { useNavigate } from "react-router-dom";

const ReviewDetails = ({ review }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    await fetch(`/api/reviews/${review._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    navigate("/login"); // Assuming you want to navigate to the homepage after deleting a review
  };

  return (
    <div className="review-details">
      <h4>Reviewer: {review.reviewer}</h4>
      <p>Rating: {review.rating}</p>
      <p>Comment: {review.comment}</p>
      <span
        className="material-symbols-outlined"
        style={{ cursor: 'pointer' }} // Added to visually indicate this is clickable
        onClick={handleClick}
      >
        delete
      </span>
    </div>
  );
};

export default ReviewDetails;
