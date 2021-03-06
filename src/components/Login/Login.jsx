import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";

import {
  CssBaseline,
  Avatar,
  Container,
  Grid,
  Button,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Link,
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends Component {
  handleSubmit = ({ email, password }) => {
    this.props.onLogin(email, password);
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
            Sign in
          </Typography>

          <Form
            onSubmit={this.handleSubmit}
            validate={values => {
              const errors = {};
              if (
                values.email &&
                !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                  values.email,
                )
              ) {
                errors.email = "Inccorect email";
              }

              if (String(values.password).length < 7) {
                errors.password = "Password must be more 7 symbols!";
              }

              if (!values.email) {
                errors.email = "Email is empty!";
              }

              if (!values.password) {
                errors.password = "Password is empty!";
              }

              return errors;
            }}
            render={({ handleSubmit }) => (
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <Field
                  onChange={this.handleChange}
                  name="email"
                  render={({ meta, input }) => (
                    <TextField
                      {...input}
                      variant="outlined"
                      margin="normal"
                      required
                      error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />
                  )}
                />
                <Field
                  name="password"
                  render={({ meta, input }) => (
                    <TextField
                      variant="outlined"
                      margin="normal"
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
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
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
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            )}
          />
        </div>
        <Box mt={8}>
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
  onLogin: authOperations.logIn,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Login);
