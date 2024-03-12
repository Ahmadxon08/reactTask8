import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/` + id)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.log("edit da hatolik bor", err);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    axios.put(`http://localhost:3000/users/` + id, data).then((res) => {
      alert("Are you sure you want to edit this account ?"), setData(res.data);
      navigate("/");
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
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
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
              onChange={(e) => setData({ ...data, username: e.target.value })}
              value={data.username}
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
              onChange={(e) => setData({ ...data, email: e.target.value })}
              aria-describedby="emailHelp"
              value={data.email}
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
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              value={data.phone}
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

export default Edit;
