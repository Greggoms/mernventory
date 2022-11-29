import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";

const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;

      setAuth({ email, accessToken });
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Paper sx={{ p: 2, width: "100%", maxWidth: "35rem" }}>
        <Typography variant="h3" align="center" mb={2}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} mx={5}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              ref={userRef}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              required
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              required
            />

            <Typography color="error.main" ref={errRef}>
              {errMsg}
            </Typography>

            <Button variant="contained" type="submit">
              Login
            </Button>

            <FormControlLabel
              control={
                <Checkbox
                  id="persist"
                  onChange={togglePersist}
                  checked={persist}
                />
              }
              label="Trust this device"
            />
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
