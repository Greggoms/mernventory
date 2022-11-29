import { useState, useEffect } from "react";
import UpdateUserForm from "../../components/UpdateUserForm";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Container } from "@mui/material";

const Profile = () => {
  const axiosPrivate = useAxiosPrivate();

  const [user, setUser] = useState({});

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    // Retrieve shop data
    const getUser = async () => {
      try {
        await axiosPrivate
          .get("/users/me", {
            signal: controller.signal,
          })
          .then((response) => {
            const res = response.data;
            isMounted && setUser(res);
          })
          .catch((err) => {
            if (err.message === "canceled") return;
          });
      } catch (err) {
        console.error(err);
      }
    };

    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

  return (
    <Container>
      <UpdateUserForm user={user} />
    </Container>
  );
};

export default Profile;
