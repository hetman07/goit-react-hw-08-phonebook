import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Form, Field } from "react-final-form";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CssBaseline,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { withStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

import { authOperations, authSelectors } from "../../redux/auth";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Register extends Component {
  handleSubmit = ({ name, email, password }) => {
    this.props.onAddUser(name, email, password);
  };

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Form
            onSubmit={this.handleSubmit}
            validate={values => {
              const errors = {};

              if (!values.name) {
                errors.name = "Name is empty!";
              }

              if (!values.email) {
                errors.email = "Email is empty!";
              }

              if (
                values.email &&
                !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                  values.email,
                )
              ) {
                errors.email = "Inccorect email";
              }

              if (!values.password) {
                errors.password = "Password is empty!";
              }

              if (String(values.password).length < 7) {
                errors.password = "Password must be more 7 symbols!";
              }

              return errors;
            }}
            render={({ handleSubmit }) => (
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="name"
                      render={({ meta, input }) => (
                        <TextField
                          {...input}
                          autoComplete="fname"
                          name="name"
                          variant="outlined"
                          required
                          error={meta.touched && meta.error}
                          helperText={meta.touched && meta.error}
                          fullWidth
                          id="firstName"
                          label="First Name"
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      onChange={this.handleChange}
                      name="email"
                      render={({ meta, input }) => (
                        <TextField
                          {...input}
                          variant="outlined"
                          required
                          error={meta.touched && meta.error}
                          helperText={meta.touched && meta.error}
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="password"
                      render={({ meta, input }) => (
                        <TextField
                          variant="outlined"
                          {...input}
                          required
                          error={meta.touched && meta.error}
                          helperText={meta.touched && meta.error}
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                {this.props.isError && (
                  <Alert severity="error">
                    Bad request, maybe Inccorect email or password!
                  </Alert>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            )}
          />
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isError: authSelectors.getError(state),
});

const mapDispatchToProps = {
  onAddUser: authOperations.register,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Register);
