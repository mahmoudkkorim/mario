import React, { useState, useEffect } from "react";

import { BiHide, BiShow } from "react-icons/bi";

import { InputInterface } from "../../interfaces/public";

const Input = (props: InputInterface): JSX.Element => {
    const [focusOnInput, setFocusOnInput] = useState(false);
    const [toogleLabel, setToogleLabel] = useState(true);
    const [inputHighlited, setInputHighlited] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        htmlFor,
        label,
        type,
        id,
        name,
        placeholder,
        value,
        onChange,
        minLength,
        min,
        max,
        step,
        readOnly,
        error,
        onBlur,
        checked,
        required,
        textStart,
        title,
        labelBgColor,
        pattern,
    } = props;

    // make sure to hide input label
    useEffect(() => {
        if (focusOnInput) {
            return;
        }

        let timer = setTimeout(() => {
            setToogleLabel(false);
        }, 150);

        return () => {
            clearTimeout(timer);
        };
    }, [focusOnInput]);

    const focusOnInputHandler = () => {
        setFocusOnInput(true);
        setToogleLabel(true);
        setInputHighlited(true);
    };

    const blurOfInputHandler = () => {
        setFocusOnInput(false);
        setInputHighlited(false);
        if (value) {
            setFocusOnInput(true);
        }
    };

    const toggleShowPasswordHandler = () => {
        setFocusOnInput(true);
        setShowPassword((prevstate) => !prevstate);
    };
    useEffect(() => {
        if (value) {
            setFocusOnInput(true);
        }
    }, [value]);

    if (type === "radio") {
        return (
            <div className="flex justify-start items-center gap-2 select-none ">
                <label
                    htmlFor={htmlFor}
                    className="border-[1px] border-smothDark w-4 h-4 rounded-full relative cursor-pointer"
                >
                    {checked && (
                        <label className="absolute top-[50%] left-[50%] -translate-x-1 -translate-y-1 w-2 h-2 bg-smothDark rounded-full cursor-pointer" />
                    )}
                </label>
                <input
                    className="cursor-pointer hidden"
                    title={title}
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    checked={checked}
                />
                <label className="cursor-pointer" htmlFor={htmlFor}>
                    {label}
                </label>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={htmlFor}>{label}</label>
            <div className="relative w-full">
                <label
                    htmlFor={htmlFor}
                    className={`
          ${inputHighlited && "text-lightBlue"}
          ${
              focusOnInput
                  ? "opacity-100 -left-1 top-0 scale-75"
                  : "opacity-100 top-[48%] left-1"
          } ${!toogleLabel && "-z-10"} ${
                        labelBgColor && focusOnInput ? labelBgColor : "bg-white"
                    } text-darkGray/50 absolute z-10 px-1 text-xl -translate-y-[50%] duration-200`}
                >
                    {placeholder}
                </label>

                <span className="absolute -bottom-6 text-sm text-darkRed">
                    {error}
                </span>
                {type === "textarea" ? (
                    <textarea
                        dir="ltr"
                        className={`${
                            inputHighlited && "border-lightBlue"
                        } border-[1px] w-full placeholder:text-xl rounded-sm focus:placeholder:opacity-0 border-darkGray/50 outline-none flex  p-2 py-3`}
                        rows={1}
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        required={required}
                        value={value}
                        onChange={onChange}
                        minLength={minLength}
                        readOnly={readOnly}
                        onFocus={focusOnInputHandler}
                        onBlur={blurOfInputHandler}
                    ></textarea>
                ) : (
                    <input
                        dir="ltr"
                        pattern={pattern}
                        onFocus={focusOnInputHandler}
                        onBlur={blurOfInputHandler}
                        className={`${
                            inputHighlited && "border-lightBlue"
                        } border-[1px] w-full placeholder:text-xl rounded-sm focus:placeholder:opacity-0 border-darkGray/50 outline-none flex  p-2 py-3`}
                        type={
                            id === "password"
                                ? showPassword
                                    ? "text"
                                    : "password"
                                : type
                        }
                        id={id}
                        name={name}
                        placeholder={!toogleLabel ? placeholder : ""}
                        required={required}
                        value={value}
                        onChange={onChange}
                        readOnly={readOnly}
                        minLength={minLength}
                        min={min}
                        max={max}
                        step={step}
                    />
                )}
                {type === "password" && (
                    <span
                        onClick={toggleShowPasswordHandler}
                        className="absolute bottom-[50%] translate-y-[50%] right-2 hover:scale-110 cursor-pointer"
                    >
                        {showPassword ? <BiHide /> : <BiShow />}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Input;
