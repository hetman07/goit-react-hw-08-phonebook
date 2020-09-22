import React from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import phonebookOperations from "../../redux/phonebook/phonebookOperations";
import phonebookSelectors from "../../redux/phonebook/phonebookSelectors";

import styles from "../ContactList//ContactList.module.css";

const ContactListItem = ({ id, name, number, onRemove }) => {
  return (
    <CSSTransition
      in={true}
      appear={true}
      key={id}
      timeout={250}
      classNames={{ ...styles }}
      unmountOnExit
    >
      <li className={styles.TaskListItem} key={id}>
        <span className={styles.TaskListText}>{name}: </span>
        <span className={styles.TaskListText}>{number}</span>
        <button
          type="button"
          className={styles.TaskListButton}
          onClick={onRemove}
        >
          Delete
        </button>
      </li>
    </CSSTransition>
  );
};

ContactListItem.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onRemove: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const contact = phonebookSelectors.getContactId(state, ownProps.id);
  return { ...contact };
};
const mapDispatchToprops = (dispatch, { id }) => ({
  //   onRemove: phonebookOperations.delContact,
  onRemove: () => dispatch(phonebookOperations.delContact(id)),
});

export default connect(mapStateToProps, mapDispatchToprops)(ContactListItem);
