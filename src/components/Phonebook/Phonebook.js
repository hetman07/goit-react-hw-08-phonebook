import React, { Component } from "react";
import { compose } from "redux";
import PulseLoader from "react-spinners/PulseLoader";
import { connect } from "react-redux";

import phonebookOperations from "../../redux/phonebook/phonebookOperations";
import phonebookSelectors from "../../redux/phonebook/phonebookSelectors";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import Alert from "../Alert";
import ContactForm from "../ContactForm";
import Filter from "../Filter";
import ContactList from "../ContactList";
import Logo from "../Logo";

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
});

class Phonebook extends Component {
  componentDidMount() {
    this.props.onFetchContacts();
  }
  render() {
    const { classes } = this.props;
    return (
      <>
        <CssBaseline />

        <main className={classes.layout}>
          <Logo text={"Phonebook"} />
          <ContactForm />
          <Filter />
          {this.props.isLoadingContact && <PulseLoader />}
          {this.props.isError && (
            <Alert onShow={this.props.isErrorMessage.message} />
          )}
          <ContactList />
        </main>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isLoadingContact: phonebookSelectors.getLoading(state),
  isError: phonebookSelectors.getError(state),
  isErrorMessage: phonebookSelectors.getErrorMsg(state),
});

const mapDispatchToProps = {
  onFetchContacts: phonebookOperations.fetchContacts,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Phonebook);
