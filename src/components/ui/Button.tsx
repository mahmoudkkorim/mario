import React from "react";
import { Link } from "react-router-dom";

import { ButtonInterface } from "../../interfaces/public";

const Button = (props: ButtonInterface): JSX.Element => {
    const {
        className,
        type,
        children,
        to,
        onClick,
        deleteBtn,
        editBtn,
        createBtn,
        style,
        imgBtn,
    } = props;

    if (type === "link") {
        return (
            <Link
                onClick={onClick}
                to={to!}
                className={`shadow-lg ${
                    className &&
                    !className.includes("text") &&
                    "text-base sm:text-lg "
                } ${className} relative resister-button hover:scale-105 duration-300 flex justify-center items-center gap-1  text-center `}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            className={`${!imgBtn && "button-shadow-up"} ${
                deleteBtn
                    ? "bg-darkRed hover:border-transparent delete-button"
                    : editBtn
                    ? "bg-stars hover:border-transparent edit-button"
                    : createBtn
                    ? "bg-success hover:border-transparent create-button"
                    : !imgBtn && "resister-button"
            } ${className} ${
                className &&
                !className.includes("text") &&
                "text-base sm:text-lg "
            } capitalize relative hover:scale-105 w-fit duration-300 flex justify-center items-center gap-1 font-bold`}
            style={style}
        >
            {children}
        </button>
    );
};

export default Button;
