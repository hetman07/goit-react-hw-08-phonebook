import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import phonebookSelectors from "../../redux/phonebook/phonebookSelectors";
import ContactListItem from "../ContactListItem/ContactListItem";
import styles from "./ContactList.module.css";

const ContactList = ({ contacts }) => {
  return (
    <div className={styles.TaskEditor}>
      <h2>Contacts</h2>
      <ul>
        {contacts.map(({ id }) => (
          <ContactListItem key={id} id={id} />
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};

const mapStateToProps = state => ({
  contacts: phonebookSelectors.getVisibleContacts(state),
});

export default connect(mapStateToProps)(ContactList);
