import React from "react";

import { MessageInterface } from "../../interfaces/public";

const Message = (props: MessageInterface) => {
  const { children } = props;

  return (
    <div className="flex justify-center items-center flex-1">
      <span className="text-sm font-semibold text-darkRed">{children}</span>
    </div>
  );
};

export default Message;
