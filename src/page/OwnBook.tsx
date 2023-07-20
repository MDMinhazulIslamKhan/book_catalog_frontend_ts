/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
  useGetGenreQuery,
  useGetOwnBooksQuery,
} from "../redux/features/book/bookApi";

const OwnBook = () => {
  const [deleteBook, options] = useDeleteBookMutation();
  const [pageNo, setPageNo] = useState(1);
  const [genre, setGenre] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [limit, setLimit] = useState("5");
  const [matchSearch, setMatchSearch] = useState("");
  const { data } = useGetGenreQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { isError, isSuccess, error } = options;
  console.log(isError, isSuccess, error);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: bookData } = useGetOwnBooksQuery(
    {
      page: pageNo,
      limit,
      sortBy,
      sortOrder,
      searchTerm: genre ? "genre" : "",
      exactSearch: genre,
      matchSearch: matchSearch,
    },
    { refetchOnMountOrArgChange: true }
  );
  const page = bookData?.data?.meta?.page;
  const totalPage = Math.ceil(
    bookData?.data?.meta?.count / bookData?.data?.meta?.limit
  );
  const handleDelete = (id: any) => {
    const confirmation = window.confirm("Are you sure to delete this book?");
    let showMessage;
    if (!confirmation) {
      showMessage = "Book deleted";
      return showMessage;
    }

    deleteBook(id);
  };
  return (
    <div className="overflow-x-auto">
      <h1 className="text-center font-extrabold text-4xl text-primary underline mb-5">
        My Published Book
      </h1>

      <table className="table table-pin-rows table-pin-cols">
        <tbody>
          <tr>
            <th></th>
            <td>Title</td>
            <td>Author</td>
            <td>Genre</td>
            <td>Publication Date</td>
            <td></td>
          </tr>
        </tbody>
        <tbody>
          {bookData?.data?.data.map((book: any, index: number) => (
            <tr>
              <th>{index + 1}</th>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{new Date(book.publicationDate).toLocaleDateString()}</td>
              <td>
                <Link
                  to={`/edit-book/${book._id}`}
                  className="btn btn-xs btn-outline btn-secondary mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="btn btn-xs btn-outline btn-secondary mt-1 mr-2"
                >
                  Delete
                </button>
                <Link
                  to={`/book-details/${book._id}`}
                  className="btn btn-xs btn-outline btn-secondary mt-1"
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-center pt-12 pb-2">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setMatchSearch(e.target.value)}
          className="input input-bordered input-secondary input-xs w-40 max-w-xs"
        />
        <button
          type="submit"
          className="btn ml-3 btn-xs hover:text-white
         btn-secondary"
        >
          Search
        </button>
        <select
          name="genre"
          className="select select-bordered select-xs w-32 select-secondary ml-5 max-w-xs"
          onChange={(e) => setGenre(e.target.value)}
        >
          <option selected className="bg-accent" value="">
            All genre
          </option>
          {data?.data?.map((genre: any) => (
            <option className="bg-accent" value={genre.genre}>
              {genre.genre}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full flex justify-center">
        <select
          name="genre"
          className="select select-bordered select-xs w-28 select-secondary ml-5 max-w-xs"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option disabled selected className="bg-accent">
            Sort By
          </option>
          <option className="bg-accent" value="title">
            Book Title
          </option>
          <option className="bg-accent" value="author">
            Author name
          </option>
          <option className="bg-accent" value="publicationDate">
            Publication Date
          </option>
        </select>
        <select
          name="genre"
          className="select select-bordered select-xs w-28 select-secondary ml-5 max-w-xs"
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option disabled selected className="bg-accent">
            Sort Order
          </option>
          <option className="bg-accent" value="asc">
            Ascending order
          </option>
          <option className="bg-accent" value="desc">
            Descending order
          </option>
        </select>
      </div>
      <div className="mt-10 pb-5 w-full flex justify-center">
        <div className="join">
          Page:
          {Array.from({ length: totalPage }, (_, index) => (
            <button
              className={`join-item btn btn-accent ml-1 btn-xs ${
                page === index + 1 ? "btn-active" : ""
              }`}
              key={index + 1}
              onClick={() => setPageNo(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <select
          onChange={(e) => {
            setLimit(e.target.value);
            setPageNo(1);
          }}
          className="select inline select-secondary select-xs w-14 max-w-xs mx-4"
        >
          <option selected>5</option>
          <option>10</option>
          <option>15</option>
        </select>
      </div>
    </div>
  );
};

export default OwnBook;
