import React, { Component } from "react";
import { compose } from "redux";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { Form, Field } from "react-final-form";

import phonebookOperations from "../../redux/phonebook/phonebookOperations";
import phonebookSelectors from "../../redux/phonebook/phonebookSelectors";

// import styles from "./ContactForm.module.css";

/*********** */

import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Paper from "@material-ui/core/Paper";

import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CallIcon from "@material-ui/icons/Call";
import TextField from "@material-ui/core/TextField";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MaskedInput from "react-text-mask";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

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
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
});

class ContactForm extends Component {
  // static propTypes = {
  //   handleSubmit: PropTypes.func,
  //   handleChange: PropTypes.func,
  // };

  // state = {
  //   name: "",
  //   number: "(0  )    -    ",
  //   txtMsg: "",
  //   error: false,
  // };

  //1 ввожу данные в поле инпут и меняю поле name/number в state
  // handleChange = e => {
  //   const field = e.target.name;
  //   this.setState({
  //     [field]: e.target.value,
  //   });
  // };
  //2при нажатии на кнопку add contact снова меняем state только св-во contacts (массив обьектов {name,id})
  handleSubmit = ({ name, number }) => {
    console.log("отправка");
    // e.preventDefault();
    // const contacts = this.props.storeContacts;

    // if (
    //   contacts.find(
    //     contact => contact.name.toLowerCase() === this.state.name.toLowerCase(),
    //   )
    // ) {
    //   this.setState({ txtMsg: "Contact is dublication!", error: true });
    //   // setTimeout(() => this.setState({ txtMsg: "", error: false }), 3000);
    // } else if (!this.state.name || this.state.number === "(0  )    -    ") {
    //   this.setState({ txtMsg: "Contact is EMPTY!", error: true });
    //   // setTimeout(() => this.setState({ txtMsg: "", error: false }), 3000);
    // } else {
    this.props.onAddContact(name, number);
    // }

    // this.setState({
    //   name: "",
    //   number: "(0  )    -    ",
    //   txtMsg: "",
    //   error: false,
    // });
    console.log("чистый стейт");
  };

  TextMaskCustom = props => {
    const { inputRef, ...other } = props;

    return (
      <MaskedInput
        {...other}
        ref={ref => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[
          "(",
          "0",
          /[0-9]/,
          /\d/,
          ")",
          " ",
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ]}
        placeholderChar={"\u2000"}
        showMask
        keepCharPositions={true}
      />
    );
  };

  render() {
    const { classes } = this.props;
    // const { name, number, txtMsg, error } = this.state;

    return (
      <>
        <CssBaseline />

        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Creating new contact:
            </Typography>

            <Form
              onSubmit={this.handleSubmit}
              validate={values => {
                const errors = {};
                const contacts = this.props.storeContacts;

                if (contacts.find(contact => contact.name === values.name)) {
                  errors.name = "Name is dublicate!";
                }

                if (!values.name) {
                  errors.name = "Name is empty!";
                }

                if (values.number === "(0  )    -    ") {
                  errors.number = "Phone is empty!";
                }

                return errors;
              }}
              render={({
                handleSubmit,
                form,
                submitting,
                pristine,
                values = "",
              }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Field
                        onChange={this.handleChange}
                        name="name"
                        render={({ meta, input }) => (
                          <TextField
                            value={""}
                            {...input}
                            required
                            error={meta.touched && meta.error}
                            helperText={meta.touched && meta.error}
                            id="name"
                            name="name"
                            label="Name"
                            fullWidth
                            autoComplete="given-name"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <AccountCircle />
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="number"
                        render={({ meta, input }) => (
                          <TextField
                            {...input}
                            required
                            error={meta.touched && meta.error}
                            helperText={meta.error}
                            id="number"
                            name="number"
                            label="Phone"
                            fullWidth
                            autoComplete="shipping phone-number"
                            InputProps={{
                              inputComponent: this.TextMaskCustom,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <CallIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>

                  <div className={classes.buttons}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      // onClick={form.reset}
                      disabled={submitting || pristine}
                    >
                      Add Contact
                    </Button>
                  </div>
                </form>
              )}
            />
          </Paper>
        </main>
      </>
    );
  }
}
const mapStateToprops = state => ({
  storeContacts: phonebookSelectors.getItems(state),
});

const mapDispatchToprops = {
  onAddContact: phonebookOperations.addContact,
};
export default compose(
  withStyles(styles),
  connect(mapStateToprops, mapDispatchToprops),
)(ContactForm);
