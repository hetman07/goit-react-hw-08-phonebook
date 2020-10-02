import React, { Component } from "react";
import { compose } from "redux";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { Form, Field } from "react-final-form";

import phonebookOperations from "../../redux/phonebook/phonebookOperations";
import phonebookSelectors from "../../redux/phonebook/phonebookSelectors";

import { withStyles } from "@material-ui/core/styles";

import {
  Paper,
  Grid,
  Button,
  Typography,
  TextField,
  InputAdornment,
} from "@material-ui/core";

import AccountCircle from "@material-ui/icons/AccountCircle";
import CallIcon from "@material-ui/icons/Call";
import MaskedInput from "react-text-mask";

const styles = theme => ({
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
    TextMaskCustom: PropTypes.func,
  };

  //2при нажатии на кнопку add contact снова меняем state только св-во contacts (массив обьектов {name,id})
  handleSubmit = ({ name, number }) => {
    this.props.onAddContact(name, number);
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
    return (
      <>
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

              if (contacts.find(contact => contact.number === values.number)) {
                errors.number = "Phone is dublicate!";
              }

              if (!values.name) {
                errors.name = "Name is empty!";
              }

              if (!values.number) {
                errors.number = "Phone is empty!";
              }

              return errors;
            }}
            render={({ handleSubmit, form, submitting, pristine }) => (
              <form
                noValidate
                onSubmit={async event => {
                  await handleSubmit(event);
                  form.reset();
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Field
                      onChange={this.handleChange}
                      name="name"
                      render={({ meta, input }) => (
                        <TextField
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
                          helperText={meta.touched && meta.error}
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
                    disabled={submitting || pristine}
                  >
                    Add Contact
                  </Button>
                </div>
              </form>
            )}
          />
        </Paper>
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
