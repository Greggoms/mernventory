import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { pickBy } from "lodash";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { UpdateUserContainer } from "../css/updateUserSectionStyles";

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
    <UpdateUserContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Update your account details</h2>
        <div className="label-group">
          <label htmlFor="name">New Name (first & last):</label>
          <input
            placeholder={props.user.name}
            {...register("name")}
            id="name"
            type="text"
          />
        </div>
        <div className="label-group">
          <label htmlFor="email">New Email:</label>
          <input
            placeholder={props.user.email}
            {...register("email")}
            id="email"
            type="email"
          />
        </div>
        <div className="label-group">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            {...register("password")}
            placeholder="Enter password"
          />
        </div>
        <div className="label-group">
          <label htmlFor="passwordConfirm">Confirm New Password:</label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            {...register("passwordConfirm", {
              validate: {
                emailEqual: (value) => value === getValues().password,
              },
            })}
            placeholder="Confirm password"
          />
          {errors.passwordConfirm && (
            <span className="form-error">Passwords do not match</span>
          )}
        </div>

        <button>Submit Updates</button>
      </form>

      <section>
        <h3>Notice:</h3>
        <ul>
          <li>
            All fields are optional. Fill in the fields you would like to
            update.
          </li>
          <li>
            You may be required to sign in again after updating your email.
          </li>
          <li>
            If you are updating your password, you must confirm the new password
            to ensure they match.
          </li>
        </ul>
      </section>
    </UpdateUserContainer>
  );
};

export default UpdateUserForm;
