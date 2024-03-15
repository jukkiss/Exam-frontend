import ReviewDetails from "../components/ReviewDetails";
import ReviewForm from "../components/ReviewForm";
import { useEffect, useState } from "react";

const Home = () => {
  const [reviewArray, setReviewArray] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const response = await fetch("/api/reviews", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();

      if (!response.ok) {
        console.log(data.error);
        setReviewArray([]);
        return;
      }
      setReviewArray(data);
    };
    getReviews();
  }, []);

  return (
    <div className="home">
      <div className="reviewArray">
        {reviewArray.length === 0 && <h2>No Reviews Found</h2>}
        {reviewArray.map((review) => (
          <ReviewDetails key={review._id} review={review} />
        ))}
      </div>
      <ReviewForm />
    </div>
  );
};

export default Home;
