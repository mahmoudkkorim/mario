import React from "react";
import { Children } from "../../interfaces/public";

const Layout = (props: Children) => {
  const { children } = props;

  return <div className="relative flex min-h-screen">{children}</div>;
};

export default Layout;
