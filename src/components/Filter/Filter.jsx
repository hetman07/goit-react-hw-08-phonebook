import React from "react";
import { connect } from "react-redux";
import phonebookActions from "../../redux/phonebook/phonebookActions";
import phonebookSelectors from "../../redux/phonebook/phonebookSelectors";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import {Paper, Typography, TextField} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import styles from "./Filter.module.css";

const useStyles = makeStyles(theme => ({
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
}));


const Filter = ({ value, onChangeFilter, lengthContacts }) => {
  const classes = useStyles();
  return (
    <CSSTransition
    classNames={{ ...styles }}
      in={lengthContacts > 1 || value !== ""}
      timeout={500}
      
      unmountOnExit
    >
      
      <Paper >
      <div className={classes.paper}>
      <Typography variant="h6" gutterBottom>
      Find contacts by name:
          </Typography>
          <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="filter"
              label="filter"
              name="filter"
              autoComplete="filter"
              value={value}
              onChange={e => onChangeFilter(e.target.value)}
            />
            </div>
      </Paper>
      
    </CSSTransition>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChangeFilter: PropTypes.func.isRequired,
  lengthContacts: PropTypes.number,
};

const mapStateToProps = state => ({
  value: phonebookSelectors.getFilter(state),
  lengthContacts: phonebookSelectors.getItems(state).length,
});

const mapDispatchToProps = {
  onChangeFilter: phonebookActions.changeFilter,
};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
