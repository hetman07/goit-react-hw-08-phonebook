import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { authSelectors } from "../../redux/auth";
import routes from "../../routes";
/*
1- если маршрут приватный и пользователь залогинен, рендерить компонент
2- в противном случае рендерить Redirect на login */
const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  access,
  ...routeProps
}) => (
  <Route
    {...routeProps}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={routes.login} />
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.isAuthenticated(state),
});

export default connect(mapStateToProps)(PrivateRoute);

// (!isAuthenticated && !access) || (isAuthenticated && access) ? (
//   <Component {...props} />
// ) : (
//   <Redirect to={routes.login} />
// )
