import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import routes from "../../routes";

import { authSelectors, authOperations } from "../../redux/auth";

const styles = {
  root: {
    flexGrow: 1,
  },
  appBar: {
    position: "relative",
  },
  title: {
    flexGrow: 1,
  },
};

const UserMenu = ({ classes, isAuthenticated, name, onLogout }) => {
  console.log(isAuthenticated);
  return (
    <>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} noWrap>
            Welcome
          </Typography>
          {isAuthenticated ? (
            <>
              <NavLink component={Button} color="inherit" to={routes.contacts}>
                {name}
              </NavLink>
              {/* <NavLink component={Button} color="inherit" to="/"> */}
              <Button variant="contained" color="primary" onClick={onLogout}>
                Logout
              </Button>
              {/* </NavLink> */}
            </>
          ) : (
            <>
              <NavLink component={Button} color="inherit" to={routes.login}>
                Signin
              </NavLink>
              <NavLink component={Button} color="inherit" to={routes.register}>
                Signup
              </NavLink>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

const mapStateToProps = state => ({
  name: authSelectors.getUserName(state),
  isAuthenticated: authSelectors.isAuthenticated(state),
});

const mapDispatchToProps = {
  onLogout: authOperations.logOut,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(UserMenu);
