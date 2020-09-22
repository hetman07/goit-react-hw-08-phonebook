import { createAction } from "@reduxjs/toolkit";

const registerRequest = createAction("REGISTR_USER_REQUEST");
const registerSuccess = createAction("REGISTR_USER_SUCCESS");
const registerError = createAction("REGISTR_USER_ERROR");

const loginRequest = createAction("LOGIN_USER_REQUEST");
const loginSuccess = createAction("LOGIN_USER_SUCCESS");
const loginError = createAction("LOGIN_USER_ERROR");

const logoutRequest = createAction("LOGOUT_USER_REQUEST");
const logoutSuccess = createAction("LOGOUT_USER_SUCCESS");
const logoutError = createAction("LOGOUT_USER_ERROR");

const getCurrentUserRequest = createAction("GETCURRENT_USER_REQUEST");
const getCurrentUserSuccess = createAction("GETCURRENT_USER_SUCCESS");
const getCurrentUserError = createAction("GETCURRENT_USER_ERROR");

export default {
  registerRequest,
  registerSuccess,
  registerError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
};
