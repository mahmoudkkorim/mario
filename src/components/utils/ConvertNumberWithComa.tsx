import React from "react";

interface ConvertNumberWithComaI {
    number: number;
}

const ConvertNumberWithComa = (props: ConvertNumberWithComaI) => {
    const { number } = props;
    return <>{number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</>;
};

export default ConvertNumberWithComa;
