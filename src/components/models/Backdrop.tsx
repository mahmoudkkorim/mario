import React from "react";
import ReactDOM from "react-dom";

import { BackdropI } from "../../interfaces/public";

const Backdrop = (props: BackdropI): JSX.Element => {
    const { hideBackgroundColor } = props;

    return ReactDOM.createPortal(
        <div
            className={`${
                !hideBackgroundColor && "bg-smothDark/50"
            } backdrop fixed top-0 left-0 w-screen h-screen z-40`}
            onClick={props.onClose}
        ></div>,
        document.getElementById("backdrop-hook") as HTMLDivElement
    );
};

export default Backdrop;
