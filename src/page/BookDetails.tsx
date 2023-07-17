import { useParams } from "react-router-dom";
import {
  usePostReviewMutation,
  useSingleBookQuery,
} from "../redux/features/book/bookApi";
import { useAppSelector } from "../redux/hook";

const BookDetails = () => {
  const { id } = useParams();
  const [postReview, options] = usePostReviewMutation();
  const { token } = useAppSelector((state) => state.user);
  const { isSuccess } = options;

  const { data } = useSingleBookQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
  });
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const review = e.target.review.value;
    const confirmation = window.confirm("Are you sure to add comment.");
    let showMessage;
    if (!confirmation) {
      showMessage = "Review canceled";
      e.target.review.value = "";
      return showMessage;
    }

    const option = {
      id,
      data: { review },
    };

    postReview(option);

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
          <div className="w-full grid md:grid-cols-4 sm:grid-cols-2 gap-4">
            {data?.data?.reviews.map((review) => (
              <p className="text-primary">
                <span className="font-bold">{review.name}: </span>
                <span className="text-slate-700"> {review.review}</span>
              </p>
            ))}
          </div>
          <form onSubmit={handleReviewSubmit}>
            <input
              type="text"
              placeholder="Your Review"
              name="review"
              autoComplete="off"
              required
              className="input input-bordered w-full max-w-xs mt-5 mb-3"
            />
            <button
              type="submit"
              className="btn btn-outline btn-secondary btn-sm"
              disabled={!token}
            >
              {token ? "SUBMIT" : "Please Login to post a review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
