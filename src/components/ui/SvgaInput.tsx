import React from "react";

// interface
import { SvgaInputI } from "../../interfaces/public";

const SvgaInput = (props: SvgaInputI) => {
    const { label, onChange, svga_imageError } = props;

    return (
        <div className="flex flex-col gap-2 relative">
            <label htmlFor="localSvgaImage">{label}</label>
            <input
                name="localSvgaImage"
                className="border-[1px] w-full placeholder:text-xl rounded-sm focus:placeholder:opacity-0 border-darkGray/50 outline-none text-left  p-2 py-3"
                type="file"
                id="localSvgaImage"
                accept=".svga"
                multiple={false}
                max="1"
                onChange={onChange}
            />
            <span className="absolute h-5 -bottom-6 text-sm text-darkRed">
                {svga_imageError}
            </span>
        </div>
    );
};

export default SvgaInput;
