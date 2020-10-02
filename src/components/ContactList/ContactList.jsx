import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import phonebookSelectors from "../../redux/phonebook/phonebookSelectors";
import ContactListItem from "../ContactListItem/ContactListItem";
import { withStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
});

const ContactList = ({ contacts, lengthContacts }) => {
  return (
    <List
      component="ul"
      aria-labelledby="nested-list-subheader"
      subheader={
        lengthContacts > 0 ? (
          <ListSubheader component="div" id="nested-list-subheader">
            Contacts:
          </ListSubheader>
        ) : (
          <ListSubheader component="div" id="nested-list-subheader">
            No contacts for visible.
          </ListSubheader>
        )
      }
      className={styles.root}
    >
      {contacts.map(({ id }) => (
        <ContactListItem key={id} id={id} />
      ))}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    }),
  ),
};

const mapStateToProps = state => ({
  contacts: phonebookSelectors.getVisibleContacts(state),
  lengthContacts: phonebookSelectors.getItems(state).length,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(ContactList);
