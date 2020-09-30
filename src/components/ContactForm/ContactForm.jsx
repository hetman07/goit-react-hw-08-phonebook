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
  static propTypes = {
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
  };

  state = {
    name: "",
    number: "(0  )    -    ",
    txtMsg: "",
  };
  //1 ввожу данные в поле инпут и меняю поле name/number в state
  handleChange = e => {
    const field = e.target.name;
    this.setState({
      [field]: e.target.value,
    });
  };
  //2при нажатии на кнопку add contact снова меняем state только св-во contacts (массив обьектов {name,id})
  handleSubmit = e => {
    e.preventDefault();
    // const contacts = this.props.storeContacts;
    //  const errors = {};

    // if (
    //   contacts.find(
    //     contact => contact.name.toLowerCase() === this.state.name.toLowerCase(),
    //   )
    // ) {
    //   this.setState({ txtMsg: "Contact is dublication!" });
    //   setTimeout(() => this.setState({ txtMsg: "" }), 3000);
    // } else if (!this.state.name || !this.state.number) {
    //   this.setState({ txtMsg: "Contact is EMPTY!" });
    //   setTimeout(() => this.setState({ txtMsg: "" }), 3000);
    // } else {
    this.props.onAddContact(this.state.name, this.state.number);

    this.setState({
      name: "",
      number: "(0  )    -    ",
    });
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
          /[0-9]/,
          /\d/,
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

                if (!values.name) {
                  errors.name = "Name is empty!";
                }

                if (!values.number || values.number === "(0  )    -    ") {
                  errors.number = "Phone is empty!";
                }

                return errors;
              }}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Field
                        name="name"
                        render={({ meta, input }) => (
                          <TextField
                            required
                            meta={meta}
                            error={meta.touched && meta.error}
                            {...input}
                            id="name"
                            name="name"
                            label="Name"
                            fullWidth
                            autoComplete="given-name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            data-row="name"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="number"
                        render={({ meta, input }) => (
                          <TextField
                            required
                            error={meta.touched && meta.error}
                            {...input}
                            id="number"
                            name="number"
                            label="Phone"
                            fullWidth
                            autoComplete="shipping phone-number"
                            value={this.state.number}
                            onChange={this.handleChange}
                            data-row="number"
                            InputProps={{
                              inputComponent: this.TextMaskCustom,
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>

                  <div className={classes.buttons}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
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
