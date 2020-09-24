import React from "react";
import UserMenu from "../UserMenu";

const styles = {
  maxWidth: 1170,
  marginLeft: "auto",
  marginRight: "auto",
  paddingRight: 12,
  paddingLeft: 12,
};

const Layout = ({ children }) => (
  <div style={styles}>
    <UserMenu />
    <hr />
    {children}
  </div>
);
export default Layout;
