import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import phonebookOperations from "../../redux/phonebook/phonebookOperations";
import phonebookSelectors from "../../redux/phonebook/phonebookSelectors";

import Alert from "../Alert";
import styles from "./ContactForm.module.css";

class ContactForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
  };

  state = {
    name: "",
    number: "",
    txtMsg: "",
  };

  //1 ввожу данные в поле инпут и меняю поле name/number в state
  handleChange = e => {
    const field = e.target.dataset.row;
    this.setState({
      [field]: e.target.value, //данные введеные в поле инпут
    });
  };
  //2при нажатии на кнопку add contact снова меняем state только св-во contacts (массив обьектов {name,id})
  handleSubmit = e => {
    e.preventDefault();
    const contacts = this.props.storeContacts;

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === this.state.name.toLowerCase(),
      )
    ) {
      this.setState({ txtMsg: "Contact is dublication!" });
      setTimeout(() => this.setState({ txtMsg: "" }), 3000);
    } else if (!this.state.name || !this.state.number) {
      this.setState({ txtMsg: "Contact is EMPTY!" });
      setTimeout(() => this.setState({ txtMsg: "" }), 3000);
    } else {
      this.props.onAddContact(this.state.name, this.state.number);
    }

    this.setState({
      name: "",
      number: "",
    });
  };

  render() {
    const { name, number, txtMsg } = this.state;
    return (
      <>
        <Alert onShow={txtMsg} />
        <form className={styles.TaskEditor} onSubmit={this.handleSubmit}>
          <label className={styles.TaskEditorLabel}>
            Name
            <input
              className={styles.TaskEditorInput}
              type="text"
              value={name}
              onChange={this.handleChange}
              data-row="name"
            />
          </label>
          <label className={styles.TaskEditorLabel}>
            Number
            <input
              className={styles.TaskEditorInput}
              type="text"
              value={number}
              onChange={this.handleChange}
              data-row="number"
            />
          </label>

          <button type="submit" className={styles.TaskEditorButton}>
            Add contact
          </button>
        </form>
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
export default connect(mapStateToprops, mapDispatchToprops)(ContactForm);
