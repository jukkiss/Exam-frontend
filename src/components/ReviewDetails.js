import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReviewDetails = ({ review }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedReview, setEditedReview] = useState({
    reviewer: review.reviewer,
    rating: review.rating,
    comment: review.comment,
  });

  const handleEditChange = (e) => {
    setEditedReview({ ...editedReview, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/reviews/${review._id}`, {
      method: "PUT", // Use PUT or PATCH depending on your API
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(editedReview),
    });
    setIsEditing(false);
    navigate(0); // Reload the page to reflect the update. Or you can opt for a more sophisticated state management approach
  };

  const handleClickDelete = async () => {
    await fetch(`/api/reviews/${review._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    navigate("/login"); // Assuming you want to navigate to the homepage after deleting a review
  };

  return (
    <div className="review-details">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label>Reviewer:</label>
          <input
            name="reviewer"
            value={editedReview.reviewer}
            onChange={handleEditChange}
          />
          <label>Rating:</label>
          <input
            name="rating"
            type="number"
            value={editedReview.rating}
            onChange={handleEditChange}
          />
          <label>Comment:</label>
          <textarea
            name="comment"
            value={editedReview.comment}
            onChange={handleEditChange}
          />
          <button type="submit">Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <h4>Reviewer: {review.reviewer}</h4>
          <p>Rating: {review.rating}</p>
          <p>Comment: {review.comment}</p>
          <span
            className="material-symbols-outlined"
            style={{ cursor: 'pointer' }}
            onClick={handleClickDelete}
          >
            delete
          </span>
          <span
            className="material-symbols-outlined"
            style={{ cursor: 'pointer' }}
            onClick={() => setIsEditing(true)}
          >
            edit
          </span>
        </>
      )}
    </div>
  );
};

export default ReviewDetails;
