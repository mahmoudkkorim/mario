import React from "react";

import { PagesHeadersInterface } from "../../interfaces/public";

const PagesHeaders = (props: PagesHeadersInterface) => {
    const { children, small } = props;

    if (small) {
        return (
            <h3 className="my-2 mt-16 pb-0.5 border-b-[1px] w-fit border-lightBlue">
                {children}
            </h3>
        );
    }

    return (
        <h2 className="font-semibold text-xl border-b-2 border-lightBlue w-fit pb-1">
            {children}
        </h2>
    );
};

export default PagesHeaders;
