import React from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import styles from "./Logo.module.css";

export default function Logo(text) {
  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={500}
      classNames={{ ...styles }}
      unmountOnExit
    >
      <h2 className={styles.title}>{text.text}</h2>
    </CSSTransition>
  );
}

Logo.propTypes = {
  text: PropTypes.string,
};
