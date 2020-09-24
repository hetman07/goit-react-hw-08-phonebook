import React, { Suspense, lazy, Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";

import routes from "../routes";
import Layout from "./Layout";
import { authOperations } from "../redux/auth";

class App extends Component {
  componentDidMount() {
    this.props.onGetCurrentUser();
  }
  render() {
    return (
      <Suspense fallback={<PulseLoader size={20} color={"#123abc"} />}>
        <Layout>
          <Switch>
            <Route
              path={routes.register}
              exact
              component={lazy(() => import("./Register"))}
            />
            <Route
              path={routes.login}
              exact
              component={lazy(() => import("./Login"))}
            />
            <Route
              path={routes.contacts}
              exact
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
