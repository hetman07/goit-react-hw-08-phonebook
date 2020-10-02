import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Avatar from "@material-ui/core/Avatar";
import CallIcon from "@material-ui/icons/Call";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import phonebookOperations from "../../redux/phonebook/phonebookOperations";
import phonebookSelectors from "../../redux/phonebook/phonebookSelectors";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
  button: {
    "&&:hover": {
      backgroundColor: "purple",
    },
  },
}));

const StyledChip = withStyles({
  root: {
    "&&:hover": {
      backgroundColor: "purple",
    },
    "&&:focus": {
      backgroundColor: "green",
    },
  },
})(Chip);

const ContactListItem = ({ id, name, number, onRemove, styles }) => {
  const classes = useStyles();
  return (
    <CSSTransition in={true} appear={true} key={id} timeout={250} unmountOnExit>
      <Paper>
        <ListItem key={id} button>
          <ListItemAvatar>
            <Avatar
              alt={"Avatar"}
              src={
                "https://icon-library.net/images/avatar-icon-images/avatar-icon-images-7.jpg"
              }
            />
          </ListItemAvatar>
          <ListItemText id={id} primary={`${name}: `} />
          <CallIcon color="primary" />
          <ListItemText id={id} primary={number} />
          <ListItemSecondaryAction>
            <IconButton aria-label="delete" onClick={onRemove}>
              <DeleteIcon className={classes.button} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </Paper>
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
