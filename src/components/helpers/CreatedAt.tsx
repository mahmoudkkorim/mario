import React from "react";

import { CreatedAtInterface } from "../../interfaces/public";

const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const CreatedAt = (props: CreatedAtInterface): JSX.Element => {
    const { createdAt } = props;
    let date = new Date(createdAt);
    let month = monthNames[date.getMonth()];
    let day = date.getUTCDate();
    let year = date.getUTCFullYear();

    return (
        <div style={{ direction: "ltr" }}>
            {day}, {month} {year}
        </div>
    );
};

export default CreatedAt;
