import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetGenreQuery,
  useSingleBookQuery,
  useUpdateBookMutation,
} from "../redux/features/book/bookApi";
import { BookInputData, IApiResponse } from "../types";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: previousData } = useSingleBookQuery(id!, {
    refetchOnMountOrArgChange: true,
  });
  const { data }: { data?: IApiResponse<Array<{ genre: string }>> } =
    useGetGenreQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  const [updateBook, options] = useUpdateBookMutation();
  const { isSuccess } = options;

  const [genre, setGenre] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationDate, setPublicationDate] = useState("");

  useEffect(() => {
    setGenre(previousData?.data?.genre);
    setTitle(previousData?.data?.title);
    setAuthor(previousData?.data?.author);
    const date = new Date(previousData?.data?.publicationDate);
    const year = date?.getFullYear();
    const month = String(date?.getMonth()).padStart(2, "0");
    const day = String(date?.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setPublicationDate(formattedDate);
  }, [previousData]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const option: { id: string; data: BookInputData } = {
      id: id!,
      data: { title, author, genre, publicationDate },
    };
    updateBook(option);
    isSuccess && navigate("/my-book");
  };

  return (
    <div className="flex justify-center my-8">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-center font-bold text-2xl my-3">Edit book</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                name="title"
                autoComplete="off"
                placeholder="Book Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
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
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
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
                value={publicationDate}
                required
                onChange={(e) => setPublicationDate(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control">
              <p className="text-red-600 my-2 text-center"></p>
              <button
                type="submit"
                disabled={!previousData}
                className="btn btn-secondary disabled:btn-accent text-white font-bold"
              >
                Edit Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
