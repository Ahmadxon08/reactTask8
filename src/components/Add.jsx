import { useState, useEffect } from "react"; // Importing useEffect
import axios from "axios"; // Removing braces from axios import
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [inputData, setInputData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });
  const [usersLength, setUsersLength] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        if (res.data.length > 0) {
          setUsersLength(res.data.length);
        }
      })
      .catch((error) => {
        console.log("Error fetching existing users", error);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const newInputData = { ...inputData };
    newInputData.id = usersLength + 1;
    axios
      .post("http://localhost:3000/users", newInputData)

      .then((res) => {
        alert("Data sent successfully");
        navigate("/");
        setInputData(res);
      })
      .catch((err) => {
        console.error("Error occurred:", err);
      });
  }

  return (
    <div className="d-flex container w-100 h-100 my-5 justify-content-center align-item-center">
      <div className="d-fles text-align-start">
        <Link to="/" className="btn btn-info  ">
          Go back
        </Link>
      </div>
      <div className="w-50 border  bg-light p-5 my-5 border-rounded-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
              value={inputData.name}
              onChange={(e) =>
                setInputData({ ...inputData, name: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              aria-describedby="emailHelp"
              value={inputData.username}
              onChange={(e) =>
                setInputData({ ...inputData, username: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              value={inputData.email}
              onChange={(e) =>
                setInputData({ ...inputData, email: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone number
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              aria-describedby="phoneHelp"
              value={inputData.phone}
              onChange={(e) =>
                setInputData({ ...inputData, phone: e.target.value })
              }
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
