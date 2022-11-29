import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { pickBy } from "lodash";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";

const UPDATE_PROFILE_URL = "/users/me";

const UpdateUserForm = (props) => {
  const axiosPrivate = useAxiosPrivate();
  const [isSafeToReset, setIsSafeToReset] = useState(false);

  // reset the form on submission
  useEffect(() => {
    if (isSafeToReset) {
      reset();
      setIsSafeToReset(false);
    } else return;
    // eslint-disable-next-line
  }, [isSafeToReset]);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    // https://github.com/react-hook-form/react-hook-form/issues/656#issuecomment-680674438
    // Strip out all values with empty strings
    const sanitizedValues = pickBy(data, (value) => value.length > 0);

    try {
      await axiosPrivate.post(UPDATE_PROFILE_URL, sanitizedValues).then(() => {
        toast(`Account details have been updated`);
      });
    } catch (err) {
      console.error(err);
    }

    // Trigger the useEffect to reset the form values
    setIsSafeToReset(true);
  };
  return (
    <Paper
      sx={{
        p: 3,
        mt: 3,
        width: "100%",
        maxWidth: "35rem",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Typography variant="h5">Update your account details</Typography>
          <TextField
            variant="outlined"
            label="New Name"
            id="name"
            placeholder={props.user.name}
            {...register("name")}
          />
          <TextField
            variant="outlined"
            label="New Email"
            id="email"
            type="email"
            placeholder={props.user.email}
            {...register("email")}
          />
          <TextField
            variant="outlined"
            label="New Password"
            type="password"
            id="password"
            name="password"
            {...register("password")}
            placeholder="Enter password"
          />

          <TextField
            variant="outlined"
            label="Confirm New Password"
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            placeholder="Confirm password"
            {...register("passwordConfirm", {
              validate: {
                emailEqual: (value) => value === getValues().password,
              },
            })}
          />
          {errors.passwordConfirm && (
            <Typography color="error.main">Passwords do not match</Typography>
          )}

          <Button type="submit" variant="contained">
            Submit Updates
          </Button>
        </Stack>
      </form>

      <Box mt={3}>
        <Typography variant="h4">Notice:</Typography>
        <Stack>
          <Typography component="li">
            All fields are optional. Fill in the fields you would like to
            update.
          </Typography>
          <Typography component="li">
            You may be required to sign in again after updating your email.
          </Typography>
          <Typography component="li">
            If you are updating your password, you must confirm the new password
            to ensure they match.
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
};

export default UpdateUserForm;
