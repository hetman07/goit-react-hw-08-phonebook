import React, { Suspense, lazy, Component } from "react";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";

import routes from "../routes";
import Layout from "./Layout";

import { authOperations } from "../redux/auth";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

class App extends Component {
  componentDidMount() {
    this.props.onGetCurrentUser();
  }
  render() {
    return (
      <Suspense fallback={<PulseLoader size={20} color={"#123abc"} />}>
        <Layout>
          <Switch>
            <PublicRoute
              path={routes.register}
              exact
              restricted={true}
              component={lazy(() => import("./Register"))}
            />
            <PublicRoute
              path={routes.login}
              exact
              restricted={true}
              component={lazy(() => import("./Login"))}
            />
            <PrivateRoute
              path={routes.contacts}
              exact
              restricted={false}
              component={lazy(() => import("./Phonebook"))}
            />

            {/* <Redirect to="/" /> */}
          </Switch>
        </Layout>
      </Suspense>
    );
  }
}

const mapDispatchToProps = {
  onGetCurrentUser: authOperations.getCurrentUser,
};
export default connect(null, mapDispatchToProps)(App);
