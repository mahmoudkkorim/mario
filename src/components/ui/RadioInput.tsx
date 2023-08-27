import React from "react";

// components
import Input from "./Input";

// interface
import { RadioInputI } from "../../interfaces/public";

const RadioInput = (props: RadioInputI) => {
    const { onChange, title, ckeckedOne, typeError, types, label } = props;
    return (
        <div className='flex flex-col gap-2 relative'>
            <label htmlFor='room_background w-fit'>
                {label ? label : "النوع"}
            </label>
            <div className='flex gap-2 flex-wrap mr-3'>
                {types.map(
                    (one) =>
                        one.type !== "all" && (
                            <Input
                                key={one.type}
                                title={title}
                                htmlFor={one.type}
                                type='radio'
                                id={one.type}
                                label={one.text}
                                onChange={onChange}
                                checked={ckeckedOne.toString() === one.type}
                                value={one.type}
                            />
                        )
                )}
            </div>
            <span className='absolute h-5 -bottom-6 text-sm text-darkRed'>
                {typeError}
            </span>
        </div>
    );
};

export default RadioInput;
