import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        const userNames = response.data.map((user) => user.name);
        isMounted && setUsers(userNames);
      } catch (err) {
        if (err.message === "canceled") return;
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate]);

  return (
    <article>
      <h3>Users List</h3>
      {users?.length ? (
        <ol style={{ marginLeft: "1rem" }}>
          {users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ol>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Users;
