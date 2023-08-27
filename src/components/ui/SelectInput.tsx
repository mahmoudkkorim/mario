import React from "react";

import { SelectInputInterface } from "../../interfaces/public";

const SelectInput = (props: SelectInputInterface): JSX.Element => {
    const { htmlFor, label, id, value, onChange, error, options, title } =
        props;

    return (
        <div className="relative flex flex-col justify-center items-start gap-1">
            <div className="flex items-center justify-start gap-5">
                <label htmlFor={htmlFor}>{label}</label>
            </div>
            <select
                className="register-input overflow-y-scroll"
                id={id}
                value={value}
                title={title}
                onChange={onChange}
                required
                size={1}
            >
                {options.map((option, i) => (
                    <option
                        id={option.type}
                        className="py-5"
                        key={i}
                        value={option.text}
                    >
                        {option.text}
                    </option>
                ))}
            </select>
            {/* <span className="absolute -bottom-6 text-sm text-darkRed">{error}</span> */}
        </div>
    );
};

export default SelectInput;
