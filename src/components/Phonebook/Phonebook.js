import React, { Component } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { connect } from "react-redux";

import phonebookOperations from "../../redux/phonebook/phonebookOperations";
import phonebookSelectors from "../../redux/phonebook/phonebookSelectors";

import Alert from "../Alert";
import ContactForm from "../ContactForm";
import Filter from "../Filter";
import ContactList from "../ContactList";
import Logo from "../Logo";

class Phonebook extends Component {
  componentDidMount() {
    this.props.onFetchContacts();
  }
  render() {
    console.log("1111", this.props.isErrorMessage.message);
    return (
      <>
        <Logo text={"Phonebook"} />
        <ContactForm />
        <Filter />
        {this.props.isLoadingContact && <PulseLoader />}
        {this.props.isError && (
          <Alert onShow={this.props.isErrorMessage.message} />
        )}
        <ContactList />
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
export default connect(mapStateToProps, mapDispatchToProps)(Phonebook);
