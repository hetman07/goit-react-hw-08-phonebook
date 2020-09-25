import React, { Suspense, lazy, Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";

import routes from "../routes";
import Layout from "./Layout";
import { authOperations } from "../redux/auth";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

class App extends Component {
  componentDidMount() {
    this.props.onGetCurrentUser();
  }
  render() {
    return (
      <Suspense fallback={<PulseLoader size={20} color={"#123abc"} />}>
        <Layout>
          <Switch>
            <PrivateRoute
              path={routes.register}
              exact
              access={"PUBLIC"}
              component={lazy(() => import("./Register"))}
            />
            <PrivateRoute
              path={routes.login}
              exact
              access={"PUBLIC"}
              component={lazy(() => import("./Login"))}
            />
            <PrivateRoute
              path={routes.contacts}
              exact
              access={"PRIVAT"}
              component={lazy(() => import("./Phonebook"))}
            />
            {/* <Redirect to="/" /> */}
          </Switch>
        </Layout>
      </Suspense>
    );
  }
}

export default connect(null, {
  onGetCurrentUser: authOperations.getCurrentUser,
})(App);
