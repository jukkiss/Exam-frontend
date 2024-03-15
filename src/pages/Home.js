import React, { useEffect, useState } from "react";
import ReviewDetails from "../components/ReviewDetails";
import ReviewForm from "../components/ReviewForm";

const Home = () => {
  const [reviewArray, setReviewArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/reviews", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data = await response.json();
      setReviewArray(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="home">
      <div className="reviewArray">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {reviewArray.length === 0 && <h2>No Reviews Found</h2>}
            {reviewArray.map((review) => (
              <ReviewDetails key={review._id} review={review} />
            ))}
          </>
        )}
      </div>
      <button className="fetch-reviews" onClick={fetchReviews}>
        Fetch Reviews
      </button>

      <ReviewForm />
    </div>
  );
};

export default Home;
