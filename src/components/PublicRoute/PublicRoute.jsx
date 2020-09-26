import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authSelectors } from "../../redux/auth";
import routes from "../../routes";

/**
 * - Если маршрут ограниченный, и пользователь залогинен, рендерит редирект на /tasks
 * - В противном случае рендерит компонент
 */
const PublicRoute = ({
  component: Component,
  isAuthenticated,
  restricted,
  ...routeProps
}) => (
  <Route
    {...routeProps}
    render={props =>
      isAuthenticated && restricted ? (
        <Redirect to={routes.contacts} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.isAuthenticated(state),
});

export default connect(mapStateToProps)(PublicRoute);
