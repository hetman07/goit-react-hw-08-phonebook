import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import routes from "../../routes";
const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Navigation() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavLink
        exact
        to={routes.register}
        className="Navigation-link"
        activeClassName="Navigation-link-active"
      >
        <Button variant="contained" color="primary">
          SignUp
        </Button>
      </NavLink>

      <NavLink
        exact
        to={routes.login}
        className="Navigation-link"
        activeClassName="Navigation-link-active"
      >
        <Button variant="contained" color="primary">
          SignIn
        </Button>
      </NavLink>

      <NavLink
        exact
        to={routes.contacts}
        className="Navigation-link"
        activeClassName="Navigation-link-active"
      >
        <Button variant="contained" color="primary">
          Contacts
        </Button>
      </NavLink>
    </div>
  );
}
