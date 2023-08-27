import React from "react";

// interfaces
import { SpecifcRowDataForSpecifcItemI } from "../../interfaces/public";

const SpecifcRowDataForSpecifcItem = (props: SpecifcRowDataForSpecifcItemI) => {
    const { data, text } = props;
    return (
        <div className="flex justify-start gap-2 items-baseline">
            <span className="text-opacity-50">{text} :</span>
            <span
                className={`${data === null && "text-darkRed"} font-semibold`}
            >
                {data !== null ? data : "غير معرف"}
            </span>
        </div>
    );
};

export default SpecifcRowDataForSpecifcItem;
