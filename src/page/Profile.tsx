import { Link } from "react-router-dom";
import {
  useProfileQuery,
  useUpdateBooklistMutation,
} from "../redux/features/user/userApi";

const Profile = () => {
  const [updateList, options] = useUpdateBooklistMutation();
  const { isSuccess } = options;
  const { data } = useProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const changeStatus = (id, status) => {
    const option = { id, data: { status } };
    updateList(option);
    window.confirm("Are you sure?");
  };

  return (
    <div className="card bg-base-100 shadow-xl mx-auto">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-primary text-2xl">
          {data?.data?.name?.firstName} {data?.data?.name?.lastName}
        </h2>
        <p className="text-xl text-primary">Email: {data?.data?.email}</p>
        <div className="w-full">
          {data?.data?.bookList.length !== 0 && (
            <div className="">
              <h3 className="text-lg mt-5 font-bold text-center">
                Your Booklist
              </h3>
              <table className="table md:w-4/5 mx-auto">
                <thead>
                  <tr>
                    <th></th>
                    <th>Book</th>
                    <th>Status</th>
                    <th>Change Status</th>
                    <th>Book details</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.bookList.map((book, index) => (
                    <tr>
                      <th>{index + 1}</th>
                      <td>
                        {book.book.title} - {book.book.author}
                      </td>
                      <td>{book.status}</td>
                      <td>
                        <div className="dropdown">
                          <label
                            tabIndex={0}
                            className="btn btn-xs btn-accent m-1"
                          >
                            Click
                          </label>
                          <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-accent rounded-box"
                          >
                            <li>
                              <p
                                onClick={() =>
                                  changeStatus(book.book._id, "Read soon")
                                }
                              >
                                Read soon
                              </p>
                            </li>
                            <li>
                              <p
                                onClick={() =>
                                  changeStatus(
                                    book.book._id,
                                    "Currently reading"
                                  )
                                }
                              >
                                Currently reading
                              </p>
                            </li>
                            <li>
                              <p
                                onClick={() =>
                                  changeStatus(
                                    book.book._id,
                                    "Finished reading"
                                  )
                                }
                              >
                                Finished reading
                              </p>
                            </li>
                          </ul>
                        </div>
                      </td>
                      <td>
                        <Link
                          to={`/book-details/${book.book._id}`}
                          className="btn btn-xs btn-accent"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {data?.data?.wishList.length !== 0 && (
            <div className="">
              <h3 className="text-lg mt-5 font-bold text-center">
                Your Wishlist
              </h3>

              <table className="table md:w-2/3 mx-auto">
                <thead>
                  <tr>
                    <th></th>
                    <th>Book</th>
                    <th>Book details</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.wishList?.map((book, index) => (
                    <tr>
                      <th>{index + 1}</th>
                      <td>
                        {book.book.title} - {book.book.author}
                      </td>

                      <td>
                        <Link
                          to={`/book-details/${book.book._id}`}
                          className="btn btn-xs btn-accent"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
