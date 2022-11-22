import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

// Handles the secure transfer of the jwt cookie
const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        // if the below statment is true, then it is the user's
        // first attempt to access the resource.
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${String(
            auth?.accessToken
          )}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    // If the token is valid, return the response. If it's not
    // then enter the async err block. This block will attempt
    // to refresh to user's accessToken and retry the request with
    // the new token.
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevRequest = err?.config;
        if (err?.response?.status === 403 && !prevRequest?.sent) {
          const newAccessToken = await refresh();
          return axiosPrivate({
            ...prevRequest,
            headers: {
              ...prevRequest.headers,
              Authorization: `Bearer ${newAccessToken}`,
            },
            sent: true,
          });
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
