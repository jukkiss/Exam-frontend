import { useEffect, useState } from "react";

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        });
        if (!response.ok) throw new Error('Failed to fetch reviews');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error(error);
        // Handle errors as appropriate
      }
    };
    fetchReviews();
  }, []);

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <li key={review._id}>{review.reviewer}: {review.comment}</li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default ReviewsList;
