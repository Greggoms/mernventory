import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";

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
    <Box>
      <Typography variant="h5">Users List</Typography>
      {users?.length ? (
        <Stack component="ol" style={{ marginLeft: "1rem" }}>
          {users.map((user, index) => (
            <Typography component="li" key={index}>
              {user}
            </Typography>
          ))}
        </Stack>
      ) : (
        <Typography>No users to display</Typography>
      )}
    </Box>
  );
};

export default Users;
