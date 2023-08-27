import React from "react";

// components
import ChangeUserLevel from "./ChangeUserLevel";
import UpdateLevel from "./UpdateLevel";

const Mapnipulation = () => {
    return (
        <div className='flex flex-wrap justify-end gap-3 sm:gap-5 mt-5'>
            <ChangeUserLevel />
            <UpdateLevel />
        </div>
    );
};

export default Mapnipulation;
