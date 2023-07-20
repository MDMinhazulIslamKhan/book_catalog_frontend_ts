/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useNavigate, useParams } from "react-router-dom";
import {
  usePostReviewMutation,
  useSingleBookQuery,
} from "../redux/features/book/bookApi";
import { useAppSelector } from "../redux/hook";
import {
  useAddBooklistMutation,
  useAddWishlistMutation,
} from "../redux/features/user/userApi";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postReview] = usePostReviewMutation();
  const [addInBooklist, booklistOptions] = useAddBooklistMutation();
  const [addInWishlist, error] = useAddWishlistMutation();

  const { token } = useAppSelector((state) => state.user);
  const { isError: booklistError } = booklistOptions;
  if (booklistError || error.error) {
    window.alert("Book is already added.");
    navigate("/my-profile");
  }

  const { data } = useSingleBookQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
  });

  const setStatus = (status: string) => {
    const option = { id, data: { status } };
    const confirm = window.confirm("Are you sure?");
    if (!confirm) {
      return;
    }
    addInBooklist(option);
  };

  const addWishlist = () => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) {
      return;
    }
    addInWishlist(id);
  };

  const handleReviewSubmit = (e: {
    preventDefault: () => void;
    target: { review: { value: string } };
  }) => {
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
      <div className="card w-2/3 bg-purple-50 text-neutral-content mx-auto">
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
          <div className="flex gap-2">
            <div className="dropdown">
              <button
                tabIndex={0}
                disabled={!token}
                className="btn btn-sm btn-secondary disabled:btn-accent"
              >
                Add into booklist
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-accent rounded-box"
              >
                <li>
                  <p
                    className="text-primary"
                    onClick={() => setStatus("Read soon")}
                  >
                    Read soon
                  </p>
                </li>
                <li>
                  <p
                    className="text-primary"
                    onClick={() => setStatus("Currently reading")}
                  >
                    Currently reading
                  </p>
                </li>
                <li>
                  <p
                    className="text-primary"
                    onClick={() => setStatus("Finished reading")}
                  >
                    Finished reading
                  </p>
                </li>
              </ul>
            </div>
            <button
              onClick={addWishlist}
              disabled={!token}
              className="btn btn-sm disabled:btn-accent btn-secondary"
            >
              Add into wishlist
            </button>
          </div>
          <h2 className="card-title text-primary font-extrabold text-2xl">
            Book Reviews
          </h2>
          <div className="w-full grid md:grid-cols-4 sm:grid-cols-2 gap-4">
            {data?.data?.reviews.map((review: any) => (
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
