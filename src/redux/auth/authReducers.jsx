import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import authActions from "./authActions";

const initialUserState = { name: null, email: null };

const userReducer = createReducer(initialUserState, {
  [authActions.registerSuccess]: (state, action) => action.payload.user,
  [authActions.loginSuccess]: (state, action) => action.payload.user,
  [authActions.getCurrentUserSuccess]: (_, { payload }) => payload,
  [authActions.logoutSuccess]: () => initialUserState,
});

const tokenReducer = createReducer(null, {
  [authActions.registerSuccess]: (_, { payload }) => payload.token,
  [authActions.loginSuccess]: (_, { payload }) => payload.token,
  [authActions.logoutSuccess]: () => null,
});

const errorReducer = createReducer(null, {
  [authActions.registerError]: (_, { payload }) => payload,
  [authActions.loginError]: (_, { payload }) => payload,
  [authActions.logoutError]: (_, { payload }) => payload,
  [authActions.getCurrentUserError]: (_, { payload }) => payload,
});

export default combineReducers({
  user: userReducer,
  token: tokenReducer,
  error: errorReducer,
});
