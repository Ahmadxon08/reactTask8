import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        setColumns(Object.keys(res.data[0]));
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  function handleDelete(id) {
    const confr = window.confirm("Are you sure you want to delete this user?");
    if (confr) {
      axios
        .delete(`http://localhost:3000/users/${id}`)
        .then((res) => {
          alert("User deleted successfully");
          setUsers(users.filter((user) => user.id !== id));
        })
        .catch((err) => {
          console.log("Error deleting user", err);
        });
    }
  }

  return (
    <div className="container my-5">
      <div className="text-end  rounded d-flex p-3  justify-content-between bg-black bg-opacity-10">
        <h1 className='fs-2 fw-bolder' >  User's information</h1>
        <Link to="/create" className="btn fs-4 fw-bolder  justify-content-center btn-primary">
          Add +
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((data, index) => (
            <tr key={index}>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>{data[column]}</td>
              ))}
              <td>
                <Link className="btn btn-sm btn-info" to={`/edit/${data.id}`}>
                  Edit
                </Link>
                <button
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() => handleDelete(data.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
