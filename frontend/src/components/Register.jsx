import { useState, useEffect, useRef } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from "../api/axios";
import { toast } from "react-toastify";
import { RegisterSectionStyles } from "../css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

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
    <RegisterSectionStyles>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h2>Create new user account</h2>
      <form onSubmit={handleSubmit}>
        <div className="label-group">
          <label htmlFor="name">First and Last name:</label>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            value={name}
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="label-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="their@email.com"
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="label-group">
          <label htmlFor="password">
            Password:{" "}
            <span className={validPassword ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validPassword || !password ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter the user's password"
            required
            value={password}
            aria-invalid={validPassword ? "false" : "true"}
            aria-describedby="passwordNote"
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
          />
          <p
            id="passwordNote"
            className={
              passwordFocus && !validPassword ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} /> Password must be at least 6
            characters.
          </p>
        </div>

        <div className="label-group">
          <label htmlFor="confirm_password">
            Confirm Password:{" "}
            <span className={validMatch && matchPassword ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validMatch || !matchPassword ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="password"
            id="confirm_password"
            placeholder="Confirm the user's password"
            onChange={(e) => setMatchPassword(e.target.value)}
            required
            value={matchPassword}
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmNote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />

          <p
            id="confirmNote"
            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} /> Must match the first
            password input field.
          </p>
        </div>

        <button disabled={!validMatch ? true : false}>Sign Up</button>
      </form>
    </RegisterSectionStyles>
  );
};

export default Register;
