import axios from "axios";
import authAction from "./authActions";

axios.defaults.baseURL = "https://goit-phonebook-api.herokuapp.com";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const register = (name, email, password) => dispatch => {
  dispatch(authAction.registerRequest());

  axios
    .post("/users/signup", { name, email, password })
    .then(response => {
      token.set(response.data.token); //передаю сгенерированый токен для записи в заголовок запроса
      return dispatch(authAction.registerSuccess(response.data));
    })
    .catch(error => dispatch(authAction.registerError(error)));
};

const logIn = (email, password) => dispatch => {
  dispatch(authAction.loginRequest());

  axios
    .post("/users/login", { email, password })
    .then(response => {
      token.set(response.data.token);
      dispatch(authAction.loginSuccess(response.data));
    })
    .catch(error => dispatch(authAction.loginError(error)));
};

const logOut = () => dispatch => {
  dispatch(authAction.logoutRequest());
  axios
    .post("/users/logout")
    .then(() => {
      token.unset();
      dispatch(authAction.logoutSuccess());
    })
    .catch(error => dispatch(authAction.logoutError(error)));
};

const getCurrentUser = () => (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) {
    return;
  }

  token.set(persistedToken);
  dispatch(authAction.getCurrentUserRequest());

  axios
    .get("/users/current")
    .then(({ data }) => dispatch(authAction.getCurrentUserSuccess(data)))
    .catch(error => authAction.getCurrentUserError(error));
};

export default {
  register,
  logIn,
  logOut,
  getCurrentUser,
};
