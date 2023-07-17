import { useParams } from "react-router-dom";
import { useSingleBookQuery } from "../redux/features/book/bookApi";

const BookDetails = () => {
  const { id } = useParams();

  const { data } = useSingleBookQuery(id);
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.review.value);
    e.target.review.value = "";
  };
  return (
    <div className="w-full">
      <div className="card w-2/3 bg-accent text-neutral-content mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-primary font-extrabold text-2xl">
            {data?.data?.title}
          </h2>
          <p className="text-primary text-xl font-semibold">
            Author: {data?.data?.author}
          </p>
          <p className="text-primary">Genre: {data?.data?.genre}</p>
          <p className="text-secondary">
            Publication Date:{" "}
            {new Date(data?.data?.publicationDate).toLocaleDateString()}
          </p>
          <h2 className="card-title text-primary font-extrabold text-2xl">
            Book Reviews
          </h2>
          {data?.data?.reviews.map((review) => (
            <p className="text-primary">
              <span className="font-bold">Name: </span>
              {review.name}
              <span className="font-bold"> ; Review: </span>
              {review.review}
            </p>
          ))}
          <form onSubmit={handleReviewSubmit}>
            <input
              type="text"
              placeholder="Your Review"
              name="review"
              className="input input-bordered w-full max-w-xs mt-5 mb-3"
            />
            <button
              type="submit"
              className="btn btn-outline btn-secondary btn-sm"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
