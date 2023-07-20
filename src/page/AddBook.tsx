import { useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import {
  useGetGenreQuery,
  usePostBookMutation,
} from "../redux/features/book/bookApi";
import { BookInputData, IApiResponse } from "../types";

const AddBook = () => {
  const navigate = useNavigate();
  const { data }: { data?: IApiResponse<Array<{ genre: string }>> } =
    useGetGenreQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  const [genre, setGenre] = useState("");
  const [postBook, options] = usePostBookMutation();
  const { isSuccess } = options;
  if (isSuccess) {
    navigate("/");
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.target as HTMLFormElement;
    event.preventDefault();
    const title = form.bookTitle.value;
    const author = form.author.value;
    const publicationDate = form.publicationDate?.value;

    const option: BookInputData = { title, author, genre, publicationDate };
    postBook(option);
  };

  return (
    <div className="flex justify-center my-8">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-center font-bold text-2xl my-3">Add new book</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                name="bookTitle"
                autoComplete="off"
                placeholder="Book Title"
                required
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Author</span>
              </label>
              <input
                name="author"
                autoComplete="off"
                placeholder="Book Author"
                required
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Genre</span>
              </label>
              <select
                name="genre"
                className="select select-bordered w-full max-w-xs"
                onChange={(e) => setGenre(e.target.value)}
              >
                <option value="">Select Genre</option>
                {data?.data?.map((genre, index) => (
                  <option key={index} className="bg-accent" value={genre.genre}>
                    {genre.genre}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Publication Date</span>
              </label>
              <input
                name="publicationDate"
                autoComplete="off"
                placeholder="Publication Date"
                type="date"
                required
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control">
              <p className="text-red-600 my-2 text-center"></p>
              <button
                type="submit"
                className="btn btn-secondary disabled:btn-accent text-white font-bold"
                disabled={!genre}
              >
                {genre ? "Add" : "Select a genre"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
