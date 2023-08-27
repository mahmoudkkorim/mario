import React from "react";

// components
import CreateEditSpecialUid from "./CreateEditSpecialUid";
import DeletespecialUid from "./DeleteSpecialUid";
import GiveSpecialUidToUser from "./GiveSpecialUidToUser";
import RemoveUserIdFromUser from "./RemoveUserIdFromUser";

const Manipulaton = () => {
    return (
        <div className="flex flex-wrap justify-end gap-3 sm:gap-5 mt-5">
            <CreateEditSpecialUid />
            <DeletespecialUid />
            <GiveSpecialUidToUser />
            <RemoveUserIdFromUser />
        </div>
    );
};

export default Manipulaton;
