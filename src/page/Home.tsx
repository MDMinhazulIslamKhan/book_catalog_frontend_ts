/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Link } from "react-router-dom";
import { useGetAllBooksQuery } from "../redux/features/book/bookApi";

const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data } = useGetAllBooksQuery({
    page: 1,
    limit: 3,
    sortBy: "",
    sortOrder: "",
    searchTerm: "",
    search: "",
    other: "",
  });

  // data.data.map((book) => console.log(book));
  data?.data?.data.map((book: any) => console.log(book));

  return (
    <div className="overflow-x-auto mb-80">
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
          {data?.data?.data.map((book: any, index: number) => (
            <tr>
              <th>{index + 1}</th>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{new Date(book.publicationDate).toLocaleDateString()}</td>
              <td>
                <Link
                  to={`/book-details/${book._id}`}
                  className="btn btn-xs btn-outline btn-secondary"
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
