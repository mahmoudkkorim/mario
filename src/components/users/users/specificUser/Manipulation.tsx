import React from "react";

// components
import EditUser from "./manipulation/EditUser";
import BlockUnBlockUser from "./manipulation/BlockUnBlockUser";
import DeleteUser from "./manipulation/DeleteUser";

const Manipulation = () => {
    return (
        <div className="flex flex-wrap justify-end gap-3 sm:gap-5 mt-5">
            <BlockUnBlockUser />
            <EditUser />
            <DeleteUser />
        </div>
    );
};

export default Manipulation;
