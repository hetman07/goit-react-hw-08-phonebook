import React from "react";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import styles from "./Alert.module.css";

export default function Alert(onShow) {
  return (
    <CSSTransition
      in={onShow.onShow !== ""}
      timeout={500}
      classNames={{ ...styles }}
      unmountOnExit
    >
      <div className={styles.alert}>
        <span className={styles.alertText}>{onShow.onShow}</span>
      </div>
    </CSSTransition>
  );
}

Alert.propTypes = {
  onShow: PropTypes.string,
};
