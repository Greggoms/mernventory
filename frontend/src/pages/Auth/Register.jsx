import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import { Stack } from "@mui/system";
import {
  Button,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const REGISTER_URL = "/register";

const Register = () => {
  const axiosPrivate = useAxiosPrivate();

  const userRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = password.length >= 6;
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosPrivate.post(
        REGISTER_URL,
        JSON.stringify({ name, email, password })
      );

      toast(`New User Created: ${name} - ${email}`);

      setName("");
      setEmail("");
      setPassword("");
      setMatchPassword("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email Already Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <Paper sx={{ p: 2, width: "100%", maxWidth: "35rem" }}>
      <Typography variant="h5" align="center" mb={2}>
        Create new user account
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} mx={5}>
          <TextField
            id="name"
            placeholder="John Doe"
            label="First & Last Name"
            variant="outlined"
            ref={userRef}
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            autoComplete="off"
          />
          <TextField
            id="email"
            label="Email"
            placeholder="their@email.com"
            variant="outlined"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            autoComplete="off"
            required
          />
          <FormControlLabel
            control={
              <TextField
                variant="outlined"
                sx={{ flex: 1, mr: 2 }}
                type="password"
                id="password"
                label="Password"
                placeholder="Enter the user's password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="passwordNote"
              />
            }
            label={
              validPassword ? (
                <CheckIcon sx={{ color: "success.main" }} />
              ) : !validPassword && password ? (
                <CloseIcon sx={{ color: "error.main" }} />
              ) : null
            }
          />
          {passwordFocus && !validPassword && (
            <Stack id="passwordNote" direction="row" spacing={2}>
              <InfoIcon sx={{ color: "info.main" }} />
              <Typography color="info.light">
                Password must be at least 6 characters.
              </Typography>
            </Stack>
          )}

          <FormControlLabel
            control={
              <TextField
                variant="outlined"
                sx={{ flex: 1, mr: 2 }}
                type="password"
                id="confirm_password"
                label="Confirm Password"
                placeholder="Confirm the user's password"
                onChange={(e) => setMatchPassword(e.target.value)}
                required
                value={matchPassword}
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmNote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
            }
            label={
              password && validMatch ? (
                <CheckIcon sx={{ color: "success.main" }} />
              ) : matchPassword ? (
                <CloseIcon sx={{ color: "error.main" }} />
              ) : null
            }
          />
          {matchFocus && !validMatch && (
            <Stack id="confirmNote" direction="row" spacing={2}>
              <InfoIcon sx={{ color: "info.main" }} />
              <Typography color="info.light">
                Must match the first password input field.
              </Typography>
            </Stack>
          )}

          <Typography color="error.main" ref={errRef}>
            {errMsg}
          </Typography>

          <Button
            type="submit"
            variant="contained"
            disabled={!validMatch ? true : false}
          >
            Sign Up
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default Register;
